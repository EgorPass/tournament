import { useDBGetMethods } from "../../../shared/store/offlineDB"
import { IDiscipline, ILevel, ILevelList, ILevelReitingList, ITournamentPlayer, ITournamentPlayerDQ, ITournamentPlayerResult } from "../../../types"
import { ReducingFutureLevels } from "../lib/ReducingFutureLevels"
import { ReducingPastLevels } from "../lib/ReducingPastLevels"

export const useReducingLevelData = () => {
  const { getItemsFromDB } = useDBGetMethods()

  return async( discipline_id: string, discipline: IDiscipline, tournamentPlayers: ITournamentPlayer[] ) => {
    const levels = await getItemsFromDB<ILevel>( "level", "discipline_id", discipline_id )
    const levelReitingList = await getItemsFromDB<ILevelReitingList>("level_reiting_list", "discipline_id", discipline_id )
    const disciplineResults = await getItemsFromDB<ITournamentPlayerResult>( "level_result", "discipline_id", discipline_id )
    const disciplineDq = await getItemsFromDB<ITournamentPlayerDQ>( "tournament_player_dq", "discipline_id", discipline_id )
    const levelListArray = await getItemsFromDB<ILevelList>( "level_list", "discipline_id", discipline_id )

    const gameOverLevels = new ReducingPastLevels( {levels, tournamentPlayers, levelReitingList, discipline: discipline! } ).reduceReitingForPastLevels( levelListArray, disciplineDq, disciplineResults )
    const futureLevels = new ReducingFutureLevels( {levels, tournamentPlayers, levelReitingList, discipline: discipline!}).create()
   
    const listData = [...gameOverLevels, ...futureLevels ].sort( (x, y ) => +x.level.levelPosition - +y.level.levelPosition)

    return listData
  }
}