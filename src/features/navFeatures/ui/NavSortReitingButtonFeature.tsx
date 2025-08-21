import { FC } from "react"
import { NavRadioMenuItem } from "../../../shared/components/navComponents/navRadioMenuItem"
import { useSortTypeButton } from "../model/useSortTypeButton"
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice"



export const NavSortReitingButtonFeature: FC<{title: string, value: string }> = ( { title, value } ) => {
  const { sortListStore, setType } = useSortTypeButton()
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  return (
    <NavRadioMenuItem 
      title = { title }
      value = { value }
      storeValue = { sortListStore.reiting }
      callback={ () => { 
        setType.setReitingSortType( value ) 
        setisVisibleMenu( false )
      } }
    />
  )
}