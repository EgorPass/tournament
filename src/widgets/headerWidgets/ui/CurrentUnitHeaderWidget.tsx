import { getFullUnitName } from "../../../entities/unit/lib/getFullUnitName"
import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IUnit } from "../../../types"
import { MainHeader } from "../components/mainHeader"

export const CurrentUnitHeaderWidget = () => {
  const getQueryData = useGetQueryData()
  const { titleMod, currentNodeId, fromId, pathname, pathnameType  } = useLocationHooks()
  const id = currentNodeId !== fromId ? fromId : currentNodeId
  const unit = getQueryData<IUnit>( "current_unit", "id", id )
  const pathState = pathname === "current_unit" && pathnameType === "create"
  const name_ = pathState ? `${ titleMod } спортсмена` : !!unit ? getFullUnitName( unit ) : ""
  
  return  <MainHeader firstTitle = { name_ } />
}