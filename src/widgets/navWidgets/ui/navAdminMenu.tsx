import { NavLink } from "../components/navLink"
import { NavMenuList } from "../components/navMenuList/navMenuList"
import { adminListMenu } from "../config/adminListMenu"

export const NavAdminMenu = () => (
  <NavMenuList title = "Администратирование">
    { 
      adminListMenu.map( it => ( 
        <NavLink key = { it.value } to = { it.value } title = { it.title } /> 
      ) ) 
    }
  </NavMenuList>
)