import { IPlayerReitingData } from "../../../../types";
import { TTournamentPlayerWithDq } from "../../model/playLayout/playMode/useSaveDataPlayMode";

export function setDqAtPlayerReitingList( playerReitingList: IPlayerReitingData[], tournamentPlayersIdWithDq: TTournamentPlayerWithDq[] ) {

  return playerReitingList.map( it => {
    const { tournament_player_id } = it
    const isFind = tournamentPlayersIdWithDq.find( pl => pl.tournament_player_id === tournament_player_id )
    if( !!isFind ) {
      return {
        levelReiting: null,
        tournament_player_id,
        levelStatus: `DQ - ${ isFind.dq }`              
      } as IPlayerReitingData
    }
    return it
  })

}