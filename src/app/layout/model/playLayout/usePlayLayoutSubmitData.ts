import { useMutation, useQueryClient,  } from "@tanstack/react-query"
import { useDBGetMethods, useDBSetMethods } from "../../../../shared/store/offlineDB"
import { ILevelList,  ILevelReitingList,  IPLayLayoutContext, ITournamentPlayerDQ, ITournamentPlayerResult, } from "../../../../types"
import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures"
import { useGetPlayerModalData  } from "../../../../shared/store/redux/slices/playerModalData"
import { useSaveDataPlayMode } from "./playMode/useSaveDataPlayMode"
import { useSaveDataToModalMode } from "./useSaveDataToModalMode"
import { useSetBookMark } from "../../../../shared/store/redux/slices/bookMarkSlice"

export type TSave = {
  restartBecouseDq: boolean
  isIgnorButtonPush: boolean
  isReturnToPosition: boolean, 
  position: number
  
}

export const usePlayLayoutSubmitData = () => {

  const queryClient = useQueryClient()
  
  const playerModalData = useGetPlayerModalData()
  const { levelList,  level, discipline, levelReitingList, tournamentPlayerDQs, tournamentPlayerResults } = usePlayLayoutContextConsumer() as IPLayLayoutContext

  const { setBookMark } = useSetBookMark()
  
  const { getItemsFromDB } = useDBGetMethods()
  const { changeAtDB, removeFromDB } = useDBSetMethods()

  const saveDataPlayMode = useSaveDataPlayMode()
  const saveDataToModalMode = useSaveDataToModalMode()

  const resetQueries = async () => {
    const queryReitingStrings = [ 
      "discipline-get-game-data",  
      "discipline-get-game-reiting", 
      "discipline-get-game-reiting-tree", 
      "discipline-reiting-list" 
    ]
    
    const playerQueries = [ 
       "current_unit_reiting", "current_tournament_player_reiting"
    ]

    await queryClient.invalidateQueries({
      predicate: ( query ) => {

        const string = query.queryKey[ 0 ] as string
        const opt = query.queryKey[ 1 ] as { [key: string]: string }
        const isReitingString = queryReitingStrings.includes( string )
        const isOpt = !!opt ? opt.id === discipline!.id : false

        return isOpt && isReitingString 
      }
      
    })

    await queryClient.invalidateQueries({
      predicate: ( query ) => playerQueries.includes( query.queryKey[0] as string )
    })


  }

  return useMutation({
    mutationFn: async( values ) => {
      if( !playerModalData.status ) return await saveDataPlayMode( values )
      else return await saveDataToModalMode( values )
    },
    async onSettled(data, error, variables, context) {
      
      if( !error && data ){

        const { 
          isIgnorButtonPush, restartBecouseDq, 
          position, isReturnToPosition, 
        } = data
        
        
        if(  !isNaN( position ) && isReturnToPosition ) {
          setBookMark( "play" )
        }

        // if( restartBecouseDq && !isIgnorButtonPush ) {
        // более не нужно есть обработка инфы если неполная то кнопка не срабатывает
        //   const resIdList = tournamentPlayerResults.map( it => it.id )
        //   const newResList = await getItemsFromDB<ITournamentPlayerResult>( "level_result", "level_id", level!.id )
        //   const removeRes = newResList.filter( it => !resIdList.includes( it.id ) )
        //   await removeFromDB( "level_result", removeRes )

        // }
        if(  !isIgnorButtonPush ) {
          console.log( " refresh .........")
          await resetQueries()
        }
      }

      if( error ) {
        console.log( error )
        if( levelList )
          await changeAtDB<ILevelList>("level_list", levelList )
        
        if( levelReitingList )
          await changeAtDB<ILevelReitingList>(  "level_reiting_list", levelReitingList )

        if( level ) {
          const dqIdList = tournamentPlayerDQs.map( it => it.id )
          const resIdList = tournamentPlayerResults.map( it => it.id )

          const newDqList = await getItemsFromDB<ITournamentPlayerDQ>( "tournament_player_dq", "level_id", level.id )
          const newResList = await getItemsFromDB<ITournamentPlayerResult>( "level_result", "level_id", level!.id )

          const removeDq = newDqList.filter( it => !dqIdList.includes( it.id ) )
          const removeRes = newResList.filter( it => !resIdList.includes( it.id ) )
          
          await removeFromDB( "level_result", removeRes )
          await removeFromDB( "tournament_player_dq", removeDq )

          await resetQueries()
        }
      }

    },
  })

}