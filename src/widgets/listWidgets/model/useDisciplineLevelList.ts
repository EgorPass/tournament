import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { ILevel } from "../../../types"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"

export const useDisciplineLevelList = () => {
  const { currentNodeId } = useLocationHooks()
  const { data: levels } = useGetSuspenseStateList<ILevel>( "level", "discipline_id", currentNodeId! ) 
	return { levels }
}
