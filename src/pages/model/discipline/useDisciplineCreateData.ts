import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament } from "../../../types"

export const useDisciplineCreateData = () => {
  const { pathname, fromPathname, fromId, currentNodeId   } = useLocationHooks()
  const { data: discipline } = useGetStateItem<IDiscipline>('discipline', "id", currentNodeId, pathname === fromPathname )
  const tournament_id = ( pathname !== fromPathname ) ? fromId : !!discipline ? discipline.tournament_id : ""
  const {isSuccess} = useGetStateItem<ITournament>("tournament", "id", tournament_id, !!tournament_id )
    return { isSuccess }
}