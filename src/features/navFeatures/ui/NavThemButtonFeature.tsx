import { FC } from "react"
import { NavRadioMenuItem } from "../../../shared/components/navComponents/navRadioMenuItem"
import { useThemeButton } from "../model/useThemeButton"
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice"

export const NavThemButtonFeature: FC<{ title: string, value: string}> = ({ title, value }) => {
  const { setTheme, themeStore } = useThemeButton()
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  return (
    <NavRadioMenuItem 
      title = { title }
      value = { value }
      storeValue = { themeStore }
      callback={ () => { 
        setTheme(value) 
        setisVisibleMenu( false )
      } }
    />
  )
}