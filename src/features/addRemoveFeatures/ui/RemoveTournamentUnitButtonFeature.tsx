import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useRemoveTournamentUnitButton } from "../model/useButtonsModel/useRemoveTournamentUnitButton";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";


export const RemoveTournamentUnitButtonFeature:FC<{title: string}> = ({ title }) => {

  const mutate = useRemoveTournamentUnitButton()
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