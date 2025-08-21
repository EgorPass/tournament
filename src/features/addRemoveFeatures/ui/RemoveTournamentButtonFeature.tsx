import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useRemoveTournamentButton } from "../model/useButtonsModel/useRemoveTournamentButton";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";

export const RemoveTournamentButtonFeature:FC<{ title:string }> = ({ title }) => {

  const mutate = useRemoveTournamentButton()
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