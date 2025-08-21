import { NavLink } from "../components/navLink"
import { singleMenuList } from "../config/singleMenuList"

export const NavMainSingleMenuItem = () =>  (
  <>
    { 
      singleMenuList.map( it => ( 
        <NavLink key = { it.value } to = { it.value } title = { it.title } /> 
      ) ) 
    }
  </>
)