import { usePlayLayoutContextConsumer } from "../../../../../features/layoutFeatures"
import { useDBSetMethods } from "../../../../../shared/store/offlineDB"
import { ILevelList, ILevelReitingList, IPLayLayoutContext,  ITournamentPlayerDQ, ITournamentPlayerResult, TLevelPlayerStatus, TResultCorteg } from "../../../../../types"
import { createNewLevelReitingList } from "../../../lib/playMode/createNewLevelReitingList"
import { filterForPlayer } from "../../../lib/playMode/filterForPlayer"
import { setDqAtPlayerReitingList } from "../../../lib/playMode/setDqAtPlayerReitingList"
import { setNextPlayerState } from "../../../lib/playMode/setNextPlayerState"
import { setNextPositionAtLevelList } from "../../../lib/playMode/setNextPositionAtLevelList"
import { setPositionAtFinishedPosition } from "../../../lib/playMode/setPositionAtFinishedPosition"
import { TSave } from "../usePlayLayoutSubmitData"
import { useCheckPlayersToDq } from "./useCheckPlayersToDq"
import { useGetPlayersDqs } from "./useGetPlayersDqs"
import { useGetPlayersResults } from "./useGetPlayersResults"
import { useSetDataToPlayersResultsAndReiting } from "./useSetDataToPlayersResultsAndReiting"

export interface IPlayersData {
  result: number 
  tournament_player_id: string
  levelStatus: TLevelPlayerStatus, 
}

export type TTournamentPlayerWithDq = {tournament_player_id: string, dq: string }

export const useSaveDataPlayMode = () => {
  
  const { changeAtDB, addToDB } = useDBSetMethods()
  const { levelList, levelListItem, level, levelReitingList, currentLevelReitingList,  tournamentPlayerDQs, tournamentPlayerResults, discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  
  const getPlayersDQs = useGetPlayersDqs()
  const checkPlayersToDq = useCheckPlayersToDq()
  const getPlayersResults = useGetPlayersResults()
  const { getTotalResultsToLevelRules, getNewCurrentReitingList } = useSetDataToPlayersResultsAndReiting()

  return async( values: any ): Promise<TSave> => {
    const waringDQ = `Перестартовка?
    * Жми Ок для перестартовки, сохраняться только штрафы;
    * Жми Отмена, чтобы записать все результаты.`

    
    let isIgnorButtonPush = false
    let nextPlayerState = false
    let restartBecouseDq = false
    let restartBecouseSomeEmpty = false
    let dqsState: ITournamentPlayerDQ[] = []
    let tournamentPlayersIdWithDq: TTournamentPlayerWithDq[] = [] 
    let playerReitingList = [ ...currentLevelReitingList ]
    
    const { dq, results, buttonType, onStart } = values
          console.log( buttonType )
    
    if( buttonType === "next" || buttonType === "save" ) {
      const subTry = levelListItem!.data.reduce( (acc, id ) => {
        const dqSubTrys = filterForPlayer( tournamentPlayerDQs, id, level!.id )
        .filter( it => it.try === levelList!.try )
        .map( it => it.subTry ? it.subTry: 1 )
        
        const resSubTrys = filterForPlayer( tournamentPlayerResults, id, level!.id )
        .filter( it => it.try === levelList!.try )
        .map( it => it.subTry ? it.subTry: 1 )
        
        return  Math.max( acc, ...dqSubTrys, ...resSubTrys )
      }, 0 ) + 1
    

      const resultArray = Object.entries( results )
            .filter( it => onStart.includes(it[0] ) ) as TResultCorteg[]
      
      const playerResults = getPlayersResults( resultArray, levelList!.try, subTry, levelListItem!.data ).filter( it => {
        if( 
          ( discipline!.condition === "time" ) && 
          ( !("result" in it  ) || ( ("result" in it ) && ( it.result === 0 ) ) ) 
        ) return false 
        return true
      })

      const playersDQs = getPlayersDQs( { dq, onStart, subTry  } )
      
      const playerWithDq = Array.from( new Set(
        playersDQs.map( it => it.tournament_player_id )
      ))
      const playersId = !!onStart && Array.isArray( onStart ) 
                      ? onStart 
                      : [] as string[]

      const isFullEmpty = ( playerResults.length === 0 ) && ( playersDQs.length === 0 )
      const isSomeFieldEmpty = ( playerResults.length > 0 ) && ( playersId.length > ( playerResults.length + playerWithDq.length ) )
      const isDqWithoutResults = playerResults.length === 0 && playerWithDq.length > 0
     
      restartBecouseSomeEmpty = isSomeFieldEmpty

      if( buttonType === "save" ) {
        if( isFullEmpty || isSomeFieldEmpty ) {
          isIgnorButtonPush = true 
        }
      }
      if( buttonType === "next" ) {
        if( isSomeFieldEmpty ) {
          isIgnorButtonPush = true 
        }
        if( isFullEmpty ) {
          isIgnorButtonPush = !window.confirm( "Переходим к следующим участникам" )
        }
        if( isDqWithoutResults ) {
          if( playersId.length < 2 ) {
            restartBecouseDq =  window.confirm( waringDQ ) 
          }
          else {
            restartBecouseDq = true 
          }
        }
      }

      if( playersDQs.length > 0 && !isIgnorButtonPush ) {
        dqsState = await addToDB("tournament_player_dq", playersDQs )

        tournamentPlayersIdWithDq = await checkPlayersToDq( dqsState )
        playerReitingList = setDqAtPlayerReitingList( playerReitingList, tournamentPlayersIdWithDq )
      }


      if( playerResults.length > 0 && !isIgnorButtonPush ) {
        await addToDB<ITournamentPlayerResult>( "level_result", playerResults )
        
        const totalResultsToLevelRules = await getTotalResultsToLevelRules( playerReitingList )
        playerReitingList = getNewCurrentReitingList( totalResultsToLevelRules, playerReitingList )
        
        nextPlayerState = setNextPlayerState(level!, playerReitingList, levelListItem!.data )
      }

      const newLevelReitingList = createNewLevelReitingList( {
        playerReitingList,
        gender: levelListItem!.gender, 
        category: levelListItem!.category, 
        levelReitingList: levelReitingList!, 
      }) 

      await changeAtDB<ILevelReitingList>( "level_reiting_list", newLevelReitingList )
    }
    
    if( !isIgnorButtonPush ) {
      const nextTry = buttonType === "try"
      const skipPlayer = buttonType === "skip"
      const nextPlayer = buttonType === "next" 
      const savePlayer = buttonType === "save"
      const isRestart = ( restartBecouseSomeEmpty || restartBecouseDq ) 
      
      const tryAtLevel = levelList!.try
      const haveAWinner = savePlayer && nextPlayerState 
      const playersFinish = nextPlayer || haveAWinner

      let currentPosition = 1
      let finishedPosition: number[] = []
      let newTryAtLevel: number = 1

      if( level!.try === "circle" ) {
        newTryAtLevel = nextTry ? ( tryAtLevel + 1 ) : tryAtLevel
  
        currentPosition = nextTry ? 1 
          : ( ( nextPlayer && !isRestart ) || skipPlayer )
            ? setNextPositionAtLevelList( levelList! ).currentPosition
            : levelList!.currentPosition
      
  
        finishedPosition = nextTry ? []
          : ( nextPlayer && !isRestart )
            ? setPositionAtFinishedPosition( levelList! ).finishedPosition 
            : levelList!.finishedPosition 
      }
      if( level!.try === "OneToOne" ) {
        newTryAtLevel = skipPlayer || playersFinish || nextPlayer ? 1
          : restartBecouseSomeEmpty // was isRestart
            ? tryAtLevel
            : tryAtLevel + 1 
      
        currentPosition = ( playersFinish  || skipPlayer ) && !isRestart
          ? setNextPositionAtLevelList( levelList! ).currentPosition 
          : levelList!.currentPosition

        finishedPosition = playersFinish && !isRestart
          ? setPositionAtFinishedPosition( levelList! ).finishedPosition
          : levelList!.finishedPosition
      }

      const newLevelList = {
        ...levelList!,
        currentPosition,
        finishedPosition,
        try: newTryAtLevel,
      } as ILevelList

      if( newLevelList ) {
        await changeAtDB<ILevelList>( "level_list", newLevelList )
      }
    }

    return {
      isIgnorButtonPush,
      restartBecouseDq,
      isReturnToPosition: false,
      position: NaN,
    }
    
  }
}