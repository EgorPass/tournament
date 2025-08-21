import { usePlayLayoutContextConsumer } from "../../../../../features/layoutFeatures"
import { useDBGetMethods } from "../../../../../shared/store/offlineDB"
import { IPlayerReitingData, IPLayLayoutContext, ITournamentPlayerResult, TLevelPlayerStatus } from "../../../../../types"
import { IPlayersData } from "./useSaveDataPlayMode"


export const useSetDataToPlayersResultsAndReiting = () => {
  const { getItemsFromDB  } = useDBGetMethods() 
  const { level, discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext


  /**
   * вычесление результатов для currentReitingLevelList,
   * то есть кто первый, кто DQ, кто уже стал winner
   */
  const getTotalResultsToLevelRules = async (playerReitingList: IPlayerReitingData[] ) => {
    const totalResultsToLevelRules: IPlayersData[] = [] 
        
    for( let playerRaitingData of playerReitingList ) {
      const { tournament_player_id, levelStatus: currentLevelStatus } = playerRaitingData 
      if( currentLevelStatus.startsWith("DQ") ) continue;
      const playerResults = await getItemsFromDB<ITournamentPlayerResult>( "level_result", "tournament_player_id", tournament_player_id, "level_id", level!.id )
      const { result, levelStatus } = getPlayerData( playerResults )
      totalResultsToLevelRules.push( { tournament_player_id, levelStatus, result } )
    }

    return totalResultsToLevelRules


  }

   /**
     * составляем рейтинг для участников исходя из их результатов,
     * перечисляет все результаты на каждое сохранить для категории, 
     * которая сейчас в игре.
     */
  const getNewCurrentReitingList = (totalResultsToLevelRules: IPlayersData[], playerReitingList: IPlayerReitingData[] ) => {

    const playersWithWinnerState = totalResultsToLevelRules.filter( it => it.levelStatus === "winner" )
    const playersWithResult = totalResultsToLevelRules.filter( it => ( it.result  >= 0 )  && ( it.levelStatus !== "winner" ) )
    const playerWithDq = playerReitingList
              .filter( it => it.levelStatus.startsWith( "DQ" ) )

    playersWithWinnerState.sort( (x, y ) => x.result - y.result )
    playersWithResult.sort( (x, y) => x.result - y.result )

    if( discipline!.condition === "point" ) {
      playersWithWinnerState.reverse()
      playersWithResult.reverse()
    }

    const winnerPlayerToData = setReitingToPlayer( playersWithWinnerState, 1 )
    const resultsPlayerToData = setReitingToPlayer( playersWithResult, winnerPlayerToData.length + 1 )
    const playerWithoutResult = setReitingToPlayer( totalResultsToLevelRules.filter( it => it.result < 0 ), null )

    return [
      ...playerWithDq,
      ...winnerPlayerToData,  
      ...resultsPlayerToData,
      ...playerWithoutResult,
    ] satisfies  IPlayerReitingData[] 
  }

  function setReitingToPlayer( data: IPlayersData[], startPosition: number | null ) {
    let position = startPosition
    return data.map( ({tournament_player_id, levelStatus }) => ({
      tournament_player_id,
      levelReiting: position ? position++ : position,
      levelStatus, 
    } as IPlayerReitingData ))
  }

  function getPlayerData( playerResults: ITournamentPlayerResult[] ) {
    const results = playerResults.map( it => it.result )
    const winnerResults = playerResults.filter( it => it.status === "winner" ).length
    const time = discipline!.condition === "time"
    const bestTry = level!.win.condition === "bestTry" || level!.win.roundWinner === "bestTry" || level!.win.roundWinner === "qualWin"
    const qualWin = level!.win.condition === "roundWinner" && level!.win.roundWinner === "qualWin"
    
    const result = results.length === 0 ? -1 : 
      (
        bestTry ? 
          ( time ? Math.min( ...results ) : Math.max( ...results ) ) :
          +( results.reduce( (acc, it ) => acc += it) / ( results.length ) )
      );
    const levelStatus: TLevelPlayerStatus =  qualWin ? ( winnerResults >= +level!.win.qual ? "winner" : "looser" ) : "play"

    return { levelStatus, result }
  }

  return { getTotalResultsToLevelRules, getNewCurrentReitingList }
}