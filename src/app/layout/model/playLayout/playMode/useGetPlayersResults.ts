import { usePlayLayoutContextConsumer } from "../../../../../features/layoutFeatures"
import { apiCheck } from "../../../../../shared/lib/api/apiCheck"
import { apiDate } from "../../../../../shared/lib/api/apiDate"
import { apiForCreateData } from "../../../../../shared/lib/api/apiForCreateData"
import { IFuckUpResultItem, ILevel, IPLayLayoutContext, ITournamentPlayerResult, TObjectStrings, TResultCorteg } from "../../../../../types"
// import { TResultCorteg } from "./useSaveDataPlayMode"


export const useGetPlayersResults = () => {

  const { level, discipline} = usePlayLayoutContextConsumer() as IPLayLayoutContext

  return ( resultArray:  TResultCorteg[], tryAtLevel: number, subTry: number, playersId: string[] ) => {
    const playerResults = getPlayerResults_( resultArray, discipline!.condition, level!, tryAtLevel, subTry )
      
      playerResults.sort( (x, y) => x.result - y.result )
      if( discipline!.condition === "point" ) playerResults.reverse() 
              
    if(level!.win.condition === "roundWinner" && level!.win.roundWinner === "qualWin" ){
      if( playersId.length <= 2 ) {
        if( playerResults.length === 1  || (
          playerResults.length === 2 && (
            playerResults[0].result !== playerResults[1].result 
          )
          
        ) ) {
           playerResults[0].status = "winner"
        }
      }
      else{
        for( let i = 1, len = playerResults.length; i < len; i++ ) {
          const { result: currentResult } = playerResults[ i ];
          const { result: pastResult } = playerResults[ i - 1]
            playerResults[ i - 1 ].status = "winner"
            if( currentResult !== pastResult ) break;
        }
      }
    }
    return playerResults
  }
}

function getPlayerResults_ ( resultArray: TResultCorteg[], condition: string, level: ILevel, tryAtLevel: number, subTry: number ): ITournamentPlayerResult[]{
  
  return resultArray.filter( it => !!it[1].results && apiCheck.isNotEmpty( it[1].results ) )
  .map( ([ tournament_player_id, data] ) => {
    
    let cleanResult = 0, totalResult = 0 ; 
    
    const fuckup:  IFuckUpResultItem[] = []
    if( "errors" in data ) {
      fuckup.push( ...convertErrors( data.errors, condition, 0 ) ) 
    }
    const errorResult = fuckup.reduce( (acc, item) => acc += item.data, 0)
    
    if( condition === "time" ) {
      cleanResult = apiDate.getTimeMs( data.results! ) 
      totalResult = cleanResult + errorResult
    }
    else{
      cleanResult = +data.results!.point
      totalResult = cleanResult - errorResult
    }
    // console.log( "cleanResult to Save", cleanResult )
    // console.log( "totalResult", totalResult )
    return apiForCreateData.createLevelResult({
        level, 
        tryAtLevel, 
        tournament_player_id, 
        errors: fuckup, 
        result: totalResult,
        subTry,
      })
  })
}

function convertErrors( errors: TObjectStrings[], condition: string, index = 0, resErrors: IFuckUpResultItem[] = [] ): IFuckUpResultItem[] {

  if( !errors[index] ) return resErrors
  else{
    let data = 0
    if( condition === "time" ) data = apiDate.getTimeMs( errors[index] )
    else data = +errors[index].point
    resErrors.push( {
      data, 
      desc: errors[index].desc
    })
  }

  return convertErrors( errors, condition,  index + 1, resErrors, )
}
