import { useSuspenseQuery } from "@tanstack/react-query"
import { useDBGetMethods } from "../../../shared/store/offlineDB"
import { useCreateReitingTreeFunction } from "./useCreateReitingTree"
import { IDiscipline, ITournamentPlayer } from "../../../types"


export const useGetDisciplineReitingList = ( discipline: IDiscipline ) => {

  const { getItemsFromDB } = useDBGetMethods()
  const queryReitingFunc = useCreateReitingTreeFunction()
  
  return useSuspenseQuery( {
      queryKey: [ "discipline-reiting-list", { "id": discipline.id } ],
      queryFn: async() => {
        const tournamentPlayers = await getItemsFromDB<ITournamentPlayer>( "tournament_player", "discipline_id", discipline.id )
        return await queryReitingFunc( discipline.id, discipline, tournamentPlayers)  
      }
    })
}