import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { NavSortTourButtonFeature } from "../../../features/navFeatures";
import { tourSortList } from "../config/tourSortList";
import { NavMenuList } from "../components/navMenuList/navMenuList";

export const NavSortTourMenu = () => {
  // console.log( "render sort menu ")
  const { pathname } = useLocationHooks()
  return (
    <>
      {
        pathname === "tournaments" && (
          <NavMenuList title = "Сортировать">
            {
              tourSortList.map( it => (
                <NavSortTourButtonFeature
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
