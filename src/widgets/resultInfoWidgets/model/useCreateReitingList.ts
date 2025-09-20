import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useReducingLevelData } from "./ useReducingLevelData"
import { IDiscipline, ITournamentPlayer } from "../../../types"

export const useCreateReitingList = (discipline: IDiscipline, tournamentPlayers: ITournamentPlayer[] ) => {
  const queryFunc_ = useReducingLevelData()
  const { currentNodeId } = useLocationHooks()

  return useSuspenseQuery({
    queryKey: [ "discipline-get-game-reiting", { "id": currentNodeId }],
    queryFn: async() => await queryFunc_(currentNodeId, discipline!, tournamentPlayers )
  })
}
