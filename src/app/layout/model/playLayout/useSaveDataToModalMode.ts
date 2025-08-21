import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures"
import { apiForCreateData } from "../../../../shared/lib/api/apiForCreateData"
import { useDBGetMethods, useDBSetMethods } from "../../../../shared/store/offlineDB"
import { useGetPlayerModalData, useSetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"
import { ILevelList, ILevelReitingList,  IPlayerReitingData, IPLayLayoutContext, ITournamentPlayerDQ,TObjectStrings, TResultCorteg } from "../../../../types"
import { createNewLevelReitingList } from "../../lib/playMode/createNewLevelReitingList"
import { findEmptyPosition } from "../../lib/playMode/findEmptyPosition"
import { setDqAtPlayerReitingList } from "../../lib/playMode/setDqAtPlayerReitingList"
import { setNextPlayerState } from "../../lib/playMode/setNextPlayerState"
import { useCheckPlayersToDq } from "./playMode/useCheckPlayersToDq"
import { useGetPlayersResults } from "./playMode/useGetPlayersResults"
import { TTournamentPlayerWithDq } from "./playMode/useSaveDataPlayMode"
import { useSetDataToPlayersResultsAndReiting } from "./playMode/useSetDataToPlayersResultsAndReiting"
import { TSave } from "./usePlayLayoutSubmitData"


export const useSaveDataToModalMode = () => {

  const { setPlayerModalData } = useSetPlayerModalData()
  const {playersId, status, position, gender, category } = useGetPlayerModalData()
  
  const { levelList, levelListItem, level, discipline, levelReitingList  } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  
  const { getItemsFromDB } = useDBGetMethods()
  const { removeFromDB, changeAtDB, addToDB } = useDBSetMethods()

  const checkPlayersToDq = useCheckPlayersToDq()
  const getPlayersResults = useGetPlayersResults()
  const { getTotalResultsToLevelRules, getNewCurrentReitingList } = useSetDataToPlayersResultsAndReiting()
  
  const saveDataToModalMode = async ( values: any  ): Promise<TSave> => {

    const { results, dq, buttonType, returnToPosition } = values
    const isReturnToPosition = ( !!returnToPosition && Array.isArray(  returnToPosition ) ) && returnToPosition.length > 0
    
    if( buttonType === "saveFromModalWindow" && status && !!level && !!discipline ) {
      let lastTry = 1;
      let isResultToTry = false
      let isSomeResults = false
      let nextPlayerState = false
      let dqsState: ITournamentPlayerDQ[] = []
      let newTryAtLevel = levelList!.try
      let newPosition = levelList!.currentPosition

      const level_id = level.id
      const tournamentPlayersIdWithDq: TTournamentPlayerWithDq[] = []
      const isCurrentPosition = levelList!.currentPosition === position 
      const finishedPosition: number[] = levelList!.finishedPosition.filter( it => it !== position ) 

      const reitringListGender = gender === "boy" ? levelReitingList!.boy : levelReitingList!.girl
      let playerReitingList = reitringListGender!
          .filter( it => it.category === category )
          .map( item => item.players ).flat()
          .map( it => ({ ...it })) as IPlayerReitingData[]

      const restPlayersReitingList = playerReitingList
        .filter( it => !playersId.includes( it.tournament_player_id ) )
      
      const currentPlayerReitingList = playerReitingList
        .filter( it => playersId.includes( it.tournament_player_id ) )
        .map( it => ({
            ...it,
            levelReiting: null,
            levelStatus: "play"
          }) as IPlayerReitingData
        )

      playerReitingList = [ ...currentPlayerReitingList, ...restPlayersReitingList ]
      
      // для начала сброс результатов для игроков
      for( let i = 0; i < playersId.length; i++ ) {
        const id = playersId[ i ]
        const rest = [ "tournament_player_id", id ]
       
        const playerDqs = await getItemsFromDB( "tournament_player_dq", "level_id", level_id, ...rest )
        const playerResults = await getItemsFromDB( "level_result", "level_id", level_id, ...rest )

        await removeFromDB( "level_result", playerResults )
        await removeFromDB( "tournament_player_dq", playerDqs )
      }

      // создание новых результатов на основе заполненых форм
      for( let tryNumber in dq ) {
        const [ , tryAtLevel, subTry ] = tryNumber.split("-").map( it => +it )

        const dqTryNumberData = Object
        .values( dq[ tryNumber ] as { [id:string]: TObjectStrings[] } )
        .flat().map( it => (
          apiForCreateData.createTournamentPlayerDQ({
            dq: it.name,
            subTry,
            tryAtLevel,
            level: level!,
            desc: it.desc,
            tournament_player_id: it.tournament_player_id,
          })
        )) as ITournamentPlayerDQ[]
        const resultsTryNumberData = Object.entries( results[ tryNumber ] ) as TResultCorteg[]
        const playerResults = getPlayersResults( resultsTryNumberData, tryAtLevel, subTry, playersId )

        const dqLength = dqTryNumberData.length 
        const playersLenght = playersId.length
        const playerWithDqLength = tournamentPlayersIdWithDq.length
        const resultsLength = playerResults.length
        
        const isEmptyField = playersId.map( id => {
          const isDqId = dqTryNumberData.find( it => it.tournament_player_id === id ) 
          const isResId = playerResults.find( it => it.tournament_player_id === id )
          return !!isDqId || !!isResId
        }).some( it => !it )

        if( !isSomeResults && !isEmptyField ) {
          isSomeResults = true
        }

        if( tryAtLevel === levelList!.try ) {
          isResultToTry = !isEmptyField
        }

        if( 
          ( resultsLength + playerWithDqLength ) === playersLenght 
          || ( resultsLength === 0 && dqLength > 0 )
          || !isEmptyField
        ){
          lastTry = tryAtLevel
          if( dqTryNumberData.length > 0 ) {
            dqsState = await addToDB("tournament_player_dq", dqTryNumberData )
          }
          if( playerResults.length > 0 ) {
            await addToDB( "level_result", playerResults )
          }

          const currentPlayersIdWithDq = await checkPlayersToDq( dqsState )
          const idWithDQ = tournamentPlayersIdWithDq.map( it => it.tournament_player_id )

          tournamentPlayersIdWithDq.push(
            ...currentPlayersIdWithDq.filter( it => !idWithDQ.includes( it.tournament_player_id ))
          )

          playerReitingList = [
            ...restPlayersReitingList,
            ...setDqAtPlayerReitingList( currentPlayerReitingList, tournamentPlayersIdWithDq ) 
          ]
          const totalResultsToLevelRules = await getTotalResultsToLevelRules( playerReitingList )
          playerReitingList = getNewCurrentReitingList( totalResultsToLevelRules,  playerReitingList )

          nextPlayerState = setNextPlayerState(level!, playerReitingList, levelListItem!.data )

          if( nextPlayerState ) break;
        
        }
        else {
          const totalResultsToLevelRules = await getTotalResultsToLevelRules( playerReitingList )
          playerReitingList = getNewCurrentReitingList( totalResultsToLevelRules,  playerReitingList )
        }
      }
      
      if( level!.try === "circle" ) {
        if( isResultToTry ) {
          finishedPosition.push( position )
        }

        newPosition = (
            ( isCurrentPosition && isResultToTry ) 
            || 
            ( isReturnToPosition && isResultToTry )
          )
            ? findEmptyPosition( finishedPosition, 1, levelList!.list.length )
            : isReturnToPosition && !isResultToTry 
              ? returnToPosition[ 0 ] : newPosition
      }

      if( level!.try === "OneToOne" ) {
        
        if( !isReturnToPosition && isSomeResults ) {
          finishedPosition.push( position )

          newPosition = isCurrentPosition ? findEmptyPosition( finishedPosition, 1, levelList!.list.length ) : newPosition
          newTryAtLevel = isCurrentPosition ? 1 : newTryAtLevel
        }
        
        if( isReturnToPosition ) {
          newPosition = returnToPosition[ 0 ]
          newTryAtLevel = isSomeResults ? lastTry + 1 : lastTry 
        }
      }
    
      const newLevelList = {
        ...levelList!,
        try: newTryAtLevel,
        currentPosition: newPosition,
        finishedPosition: Array.from( new Set( finishedPosition ) )
      } as ILevelList

      const newLevelReitingList = createNewLevelReitingList( {
        playerReitingList,
        gender: gender, 
        category: category, 
        levelReitingList: levelReitingList!, 
      }) 
      
      await changeAtDB<ILevelList>( "level_list", newLevelList )
      await changeAtDB<ILevelReitingList>( "level_reiting_list", newLevelReitingList )
      
    }
    
    setPlayerModalData( null )

    return {
      restartBecouseDq: false,
      isIgnorButtonPush: false,
      isReturnToPosition, 
      position: ( isReturnToPosition ? position : NaN ) as number 
    }
  } 

  return saveDataToModalMode
}