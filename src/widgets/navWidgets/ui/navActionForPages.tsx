import { isPropInPageActions } from "../lib/isPropInPageActions"
import { pageActions } from "../config/pageActions"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { ButtonSwitch } from "../components/ButtonSwitch"
import { NavMenuList } from "../components/navMenuList/navMenuList"
import { NavLink } from "../components/navLink"


export const NavActionForPages = () => {
  const { pathname, pathnameType, locationState } = useLocationHooks()
  return (
    <>
      {
        isPropInPageActions( pageActions, pathname ) &&
        ( pathnameType === "view") && (

          <NavMenuList title = "Действия на странице">
            {
              pageActions[pathname].map( (it: any) => {
                // console.log( it )
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
      }
    </>
  )
}