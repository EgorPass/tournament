import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useRemoveDisciplineButton } from "../model/useButtonsModel/useRemoveDisciplineButton";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";

export const RemoveDisciplineButtonFeature:FC<{ title:string }> = ({ title }) => {

  const mutate = useRemoveDisciplineButton()
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  return (
    <NavButtonItem 
      title = { title }
      onclick = { ( e ) => {
        e.preventDefault()
        mutate.mutate(null)
        setisVisibleMenu( false )
      } }
    />
  )
}