import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useRemoveLevelButton } from "../model/useButtonsModel/useRemoveLevelButton";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";

export const RemoveLevelButtonFeature:FC<{ title:string }> = ({ title }) => {

  const mutate = useRemoveLevelButton()
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  return (
    <NavButtonItem 
      title = { title }
      onclick = { ( e ) => {
        e.preventDefault()
        mutate.mutate( null )
        setisVisibleMenu( false )
      } }
    />
  )
}