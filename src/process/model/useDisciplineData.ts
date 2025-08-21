import { useLocationHooks } from "../../shared/hooks/useLocationHook"
import { IDiscipline } from "../../types"
import { useGetSuspenseStateItem } from "../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"

export const useDisciplineData = () => {
  const { currentNodeId } = useLocationHooks()
  const { data: discipline, isSuccess } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", currentNodeId! )
  return { discipline, isSuccess }
}