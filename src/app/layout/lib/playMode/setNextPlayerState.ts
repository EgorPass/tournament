import { ILevel, IPlayerReitingData } from "../../../../types";

/**
 * для вычисления победителя в состязании для roundwinner,
 * для набора необходимого числа побед
 */
export const setNextPlayerState = ( level: ILevel, playerReitingList: IPlayerReitingData[], levelListItemData: string[] ) => {

  let nextPlayerState = false 

  if( level!.win.condition === "roundWinner" && level!.win.roundWinner === "qualWin" ) {
    const winnerList = playerReitingList.filter( it => it.levelStatus === "winner" )
    const weHaveWinner = winnerList.find( it => levelListItemData.includes(it.tournament_player_id ) )
    if( !!weHaveWinner ) {
      // console.log( "we have a winner", logg( weHaveWinner ) )
      nextPlayerState = true
    }
  }
  return nextPlayerState
}