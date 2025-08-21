import { ITournamentPlayerResult, ITournamentPlayerDQ } from "../../../../types"

export type TTryData = {
  tryAtLevel: number,
  data: TSubTryData[][]
}

type TSubTryData = {
  dqs: ITournamentPlayerDQ[]
  // errors: IFuckUpResultItem[]
  result: ITournamentPlayerResult | undefined
  subTry: number,
  tryAtLevel: number,
  tournament_player_id: string
}

/**
   * разбиваем все результаты по попыткам
   */
export function reduceLevelResultsAndDqs(
  playersId: string[],
  tournamentPlayerResults: ITournamentPlayerResult[],
  tournamentPlayerDQs: ITournamentPlayerDQ[],
  tryAtLevel: number, tryArr: Array<TTryData> = [] 
): Array<TTryData> {
  
  if( tryAtLevel === 0 ) {
    tryArr.reverse()
    return tryArr
  }
  
  const tryDqs = tournamentPlayerDQs.filter( it => it.try === tryAtLevel )
  const tryResults = tournamentPlayerResults.filter( it => it.try === tryAtLevel )

  const dqsSubTryList = tryDqs.map( it => it.subTry )
  const resSubTryList = tryResults.map( it => it.subTry )
  const maxSubTry = Math.max( ...resSubTryList, ...dqsSubTryList, 1 )

  const subTryData = reduceBySubTryLevelResultsAndDqs ( playersId, tryResults, tryDqs, tryAtLevel, maxSubTry )
  
  tryArr.push( {
    tryAtLevel,
    data: subTryData
  } )

  return reduceLevelResultsAndDqs(playersId, tournamentPlayerResults, tournamentPlayerDQs, tryAtLevel - 1, tryArr )
}

/**
 * 
 * Ищет результаты и штрафы для играков и сабирает их в массив
 * по конкртной под попытке
 */
function reduceBySubTryLevelResultsAndDqs(
  playersId: string[],
  tournamentPlayerResults: ITournamentPlayerResult[], 
  tournamentPlayerDQs: ITournamentPlayerDQ[], 
  tryAtLevel: number, subTry: number, subTryArr = [] as  TSubTryData[][]
) : TSubTryData[][] {

  if( subTry === 0 ) {
    subTryArr.reverse()
    return subTryArr
  } 

  const subTryDqs = tournamentPlayerDQs.filter( it => it.subTry === subTry )
  const subTryResuts = tournamentPlayerResults.filter( it => it.subTry === subTry )

  const subTryData = playersId.map( ( tournament_player_id ) => {
    const result = subTryResuts.find( it => it.tournament_player_id === tournament_player_id )
    const dqs = subTryDqs.filter( it => it.tournament_player_id === tournament_player_id )

    return {
      dqs,
      result,
      subTry,
      tryAtLevel,
      tournament_player_id,
    } as TSubTryData

  })

  subTryArr.push( subTryData )

  return reduceBySubTryLevelResultsAndDqs( playersId, tournamentPlayerResults, tournamentPlayerDQs, tryAtLevel, subTry - 1, subTryArr )

}


