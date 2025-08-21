import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IUnit } from "../../../types"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"

export const useCurrentUnitData = () => {
  const { currentNodeId, fromId } = useLocationHooks()
  const id = currentNodeId !== fromId ? fromId : currentNodeId
  const { data: unit, isSuccess } = useGetSuspenseStateItem<IUnit>( "current_unit", "id", id )
  return { unit, isSuccess }
}