import { getFullUnitName } from "../../../entities/unit/lib/getFullUnitName"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IUnit } from "../../../types"
import { MainHeader } from "../components/mainHeader"

export const CurrentUnitHeaderWidget = suspenseHOCWrapper(
  () => {
    const { titleMod, currentNodeId, fromId, pathname, pathnameType  } = useLocationHooks()
    const id = currentNodeId !== fromId ? fromId : currentNodeId

    const { data: unit } = useGetStateItem<IUnit>( "current_unit", "id", id, !!id )
    const pathState = pathname === "current_unit" && pathnameType === "create"
    const name_ = pathState ? `${ titleMod } спортсмена` : !!unit ? getFullUnitName( unit ) : ""
    
    return  <MainHeader firstTitle = { name_ } />
  }
)