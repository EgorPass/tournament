import { NavSortReitingButtonFeature } from "../../../features/navFeatures"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useGetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"
import { IDiscipline } from "../../../types"
import { NavMenuList } from "../components/navMenuList/navMenuList"
import { reitingSortList } from "../config/reitingSortList"


export const NavSortReitingList = () => {
  const { pathname, currentNodeId } = useLocationHooks()
  const bookmark = useGetBookMark()
  const { data: discipline, isSuccess } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", currentNodeId )
  const isViewSortForDiscipline = isSuccess && !!discipline && (discipline.status === "play" || discipline.status === "gameOver")
  return (
    <>
      {
        pathname === "discipline" 
        && isViewSortForDiscipline 
        && bookmark === "reiting" && (
          <NavMenuList title = "Сортировать">
            {
              reitingSortList.map( it => (
                <NavSortReitingButtonFeature
                  key = { it.value }
                  title = { it.title }
                  value = { it.value }
                />
              ))
            }
          </NavMenuList>
        )
      }
    </>
  )
}