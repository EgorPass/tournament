import { NavSortReitingButtonFeature } from "../../../features/navFeatures"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useGetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"
import { NavMenuList } from "../components/navMenuList/navMenuList"
import { reitingSortList } from "../config/reitingSortList"


export const NavSortReitingList = () => {
  const { pathname, pathnameType } = useLocationHooks()
  const bookmark = useGetBookMark()
  return (
    <>
      {
        pathname === "discipline" 
        && pathnameType === "play" 
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