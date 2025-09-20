import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDBGetMethods, useDBSetMethods } from "../../shared/store/offlineDB";
import { IDiscipline, ILevel, ILevelList, ILevelReitingList, TCategoryFabric } from "../../types"
import { useNavigate } from "react-router-dom";
import { useLocationHooks } from "../../shared/hooks/useLocationHook";
import { CreateLevelList } from "../lib/CreateLevelList";

interface ICreateLevelList {
  discipline: IDiscipline
  level: ILevel
  womenPlayers: TCategoryFabric[]
  menPlayers: TCategoryFabric[]
  state: "accept" | "error"
}

export const useCreateLevelList = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { locationState  } = useLocationHooks()
  
  const { getItemsFromDB } = useDBGetMethods()
  const { addToDB, changeAtDB, removeFromDB } = useDBSetMethods()

  return useMutation({
    mutationFn: async ( {discipline, level, womenPlayers, menPlayers, state } : ICreateLevelList ) => {
        console.log( "in mutate ")

        console.log( womenPlayers  )

        if( 
          state === "error" 
          && level.createLevel === "fromDisciplineResult" 
          && !!level.fromResult.discipline 
        ) {
          throw new Error( "дисциплина на основании которой происходит отбор еще не готова!!!")
        }

        const createLevelList =  new CreateLevelList({ boy: [], girl: [], tournamentPlayers: [], level })

        const girlReitingList = createLevelList.mappingPlayersListToReiting( womenPlayers )
        const boyReitingList = createLevelList.mappingPlayersListToReiting( menPlayers )
        
        const girl = createLevelList.reducePlayerToLevelListItem( 1, womenPlayers, level, "girl")
        const boy = createLevelList.reducePlayerToLevelListItem( girl.position, menPlayers, level, "boy" )

        const level_list = {
          id: "",
          currentPosition: 1,
          finishedPosition: [],
          list: [ 
            ...girl.data, 
            ...boy.data 
          ],
          try: 1,
          level_id: level.id,
          discipline_id: discipline.id,
          tournament_id: discipline.tournament_id,
        } satisfies ILevelList
        
        
        const levelReitingList = {
          id: "",
          level_id: level.id,
          discipline_id: discipline.id,
          tournament_id: discipline.tournament_id,
          boy: boyReitingList,
          girl: girlReitingList,
        }

        // console.log( level_list )
        // console.log( levelReitingList )

        // console.log( girlReitingList )
        // console.log( boyReitingList)
        // console.log( girl )
        // console.log( boy )

        if( girl.data.length > 0 || boy.data.length > 0 ) {
          await addToDB<ILevelList>( "level_list", level_list )
          await addToDB<ILevelReitingList>("level_reiting_list", levelReitingList )
          await changeAtDB("level", {...level, status: "play"} )
        }
        return {
          level_list
        }
      },
      async onSettled(data, error, variables, context) {
        const { level } = variables
        
        if( !error ) {
          // console.log ("data: ", data?.level_list )
          await queryClient.invalidateQueries() 
          navigate("/api/play/discipline", { state: locationState, replace: true })
        }
       
       
        if( error ) {
          if( level ) {
            level.status = "prepare"
            await changeAtDB("level", level )

            const levelList = await getItemsFromDB<ILevelList>( "level_list", "level_id", level.id )
            const levelReitingList = await getItemsFromDB<ILevelReitingList>( "level_reiting_list", "level_id", level.id  )
            
            await removeFromDB<ILevelList>("level_list", levelList )
            await removeFromDB<ILevelReitingList>( "level_reiting_list", levelReitingList  )
          }

          console.log( error )
          await queryClient.invalidateQueries() 
          navigate("/api/view/discipline", { state: locationState, replace: true })
        }
    },
  })
}