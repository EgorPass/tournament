import { NavThemButtonFeature } from "../../../features/navFeatures"
import { NavMenuList } from "../components/navMenuList/navMenuList"
import { themeMenuList } from "../config/themeMenuList"

export const NavThemeMenu = () => {
  return (
    <NavMenuList title = "Вид">
      {
        themeMenuList.map( it => (
          <NavThemButtonFeature 
            key = { it.value }
            title = { it.title }
            value = { it.value }
          />
        ))
      }
    </NavMenuList>
  )
}