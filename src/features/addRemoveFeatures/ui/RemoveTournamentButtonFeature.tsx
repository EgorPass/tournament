import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMutationButtonData } from "../model/useButtonsModel/useMutationButtonData";
import { IDiscipline, ITournament, ITournamentUnit } from "../../../types";

export const RemoveTournamentButtonFeature:FC<{ title:string }> = ({ title }) => {

  const { setisVisibleMenu } = useSetIsVisibleMenu()
  const queryClient = useQueryClient() 
  const {  
    currentNodeId, navTo,
    getItemFromDB, getItemsFromDB, removeFromDB, removeTourUnitDiscipline, removeTournamentUnit,  
  } = useMutationButtonData()

  const { mutate } = useMutation({
    mutationFn: async() => {
      const tournament = await getItemFromDB<ITournament>( "tournament", "id", currentNodeId )
      const tourUnitList = await getItemsFromDB<ITournamentUnit>("tournament_unit", "tournament_id", currentNodeId )
      const disciplineList = await getItemsFromDB<IDiscipline>("discipline", "tournament_id", currentNodeId ) 

      for( let i = 0, len = tourUnitList.length; i < len; i++) {
        const { id, tournament_id } = tourUnitList[i]
        await removeTourUnitDiscipline( id )
        await removeTournamentUnit( id, tournament_id )
      }

      for( let i = 0, len = disciplineList.length; i < len; i++) {
        const { id } = disciplineList[i]
        const levelList = await getItemsFromDB("level", "discipline_id", id )
        await removeFromDB( "level", levelList )
        await removeFromDB("discipline", disciplineList[i] )
      }
      await removeFromDB("tournament", tournament )
    },
    async onSettled(data, error, variables, context) {
      await queryClient.invalidateQueries()
    },
  })

  return (
    <NavButtonItem 
      title = { title }
      onclick = { ( e ) => {
        e.preventDefault()
        mutate( )
        setisVisibleMenu( false )
        navTo( "tournaments", "")
      } }
    />
  )
}