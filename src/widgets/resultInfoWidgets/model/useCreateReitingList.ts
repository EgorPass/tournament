import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useReducingLevelData } from "./ useReducingLevelData"
import { usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { IPLayLayoutContext } from "../../../types"

export const useCreateReitingList = () => {
  const queryFunc_ = useReducingLevelData()
  const { currentNodeId } = useLocationHooks()
  const { tournamentPlayers , discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext

  return useSuspenseQuery({
    queryKey: [ "discipline-get-game-reiting", { "id": currentNodeId }],
    queryFn: async() => await queryFunc_(currentNodeId, discipline!, tournamentPlayers )
  })
}
