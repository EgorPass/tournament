import { isPropInPageActions } from "../lib/isPropInPageActions"
import { pageActions } from "../config/pageActions"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { ButtonSwitch } from "../components/ButtonSwitch"
import { NavMenuList } from "../components/navMenuList/navMenuList"
import { NavLink } from "../components/navLink"
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { IDiscipline } from "../../../types"


export const NavActionForPages = () => {
  const { pathname, pathnameType, locationState, currentNodeId, fromId  } = useLocationHooks()
  
  const isPathDiscipline = pathname === "discipline"
  const isDisciplineView = fromId === currentNodeId
  const { data: discipline } = useGetStateItem<IDiscipline>("discipline", "id", currentNodeId, isPathDiscipline && isDisciplineView )
  return (
    <>
      {
        ( isPathDiscipline && ( discipline && discipline.status !== "prepare" ) ) ? (
           null
        ) : (
          isPropInPageActions( pageActions, pathname ) &&
          ( pathnameType === "view") && (

            <NavMenuList title = "Действия на странице">
              {
                pageActions[pathname].map( (it: any) => {
                  
                  if( "type" in it ) {
                    return (
                      <ButtonSwitch
                        key = { it.type}
                        type = { it.type } 
                        title = { it.title } />
                      )
                  }
                  return (
                    <NavLink
                      key = { it.to }
                      to = { it.to }
                      title = { it.title }
                      state = { locationState }
                    />
                  )
                })
              }
            </NavMenuList>
          )
        )
      }
    </>
  )
}