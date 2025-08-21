import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useRemoveUnitButton } from "../model/useButtonsModel/useRemoveUnitButton";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";


export const RemoveUnitButtonFeature:FC<{title: string}> = ({ title }) => {

  const mutate = useRemoveUnitButton()
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  return (
    <NavButtonItem 
      title = { title }
      onclick={ (e) => {
        e.preventDefault()
        mutate.mutate(null)
        setisVisibleMenu( false )
      }}
    />
  )
}