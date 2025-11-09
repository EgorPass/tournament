import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { NavSortTourButtonFeature } from "../../../features/navFeatures";
import { tourSortList } from "../config/tourSortList";
import { NavMenuList } from "../components/navMenuList/navMenuList";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { useGetSuspenseStateStore } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore";
import { ITournament } from "../../../types";

export const NavSortTourMenu = suspenseHOCWrapper( 
  () => {
    const { pathname } = useLocationHooks()
    const { data: tournaments } = useGetSuspenseStateStore<ITournament>("tournament")
    const isTournamentLength = tournaments.length > 0
    return (
      <>
        {
          pathname === "tournaments" && isTournamentLength && (
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
)