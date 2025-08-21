import { useDBGetMethods } from "../../shared/store/offlineDB"
import {  ILevel, ITournamentPlayer } from "../../types"
import { CreateFirstLevelList } from "../lib/CreateFirstLevelList"

export const useGetListItmeFromFirstLevel = () => {
  const { getItemsFromDB } = useDBGetMethods()

  return async (  currentLevel: ILevel  ) => {
    const { discipline_id } = currentLevel
    const state: "accept" | "error" = "accept"
    const tournamentPlayers = await getItemsFromDB<ITournamentPlayer>("tournament_player", "discipline_id", discipline_id )
    const createFirstLevelList = new CreateFirstLevelList( { boy: [], girl: [], tournamentPlayers } )

      createFirstLevelList.filterTournamentPlayersToCategory( currentLevel )

    const { womenPlayers, menPlayers } = createFirstLevelList.get() 
    return { menPlayers, womenPlayers, state }
  }
}