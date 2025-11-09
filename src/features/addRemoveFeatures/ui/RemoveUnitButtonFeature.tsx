import { FC } from "react";
import { NavButtonItem } from "../components/navButtonItem";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMutationButtonData } from "../model/useButtonsModel/useMutationButtonData";
import { ITournamentUnit, IUnit } from "../../../types";


export const RemoveUnitButtonFeature:FC<{title: string}> = ({ title }) => {
  const { setisVisibleMenu } = useSetIsVisibleMenu()
  const queryClient = useQueryClient() 
  const {  
    currentNodeId,  navTo,
    getItemFromDB, getItemsFromDB, removeFromDB, removeTourUnitDiscipline, removeTournamentUnit,  
  } = useMutationButtonData()

  const mutate = useMutation({
    mutationFn: async() => {
      const unit = await getItemFromDB<IUnit>("current_unit", "id", currentNodeId )
      const tourUnitList = await getItemsFromDB<ITournamentUnit>("tournament_unit","current_unit_id", unit!.id )
            
      for( let i = 0, len = tourUnitList.length; i < len; i++) {
        const { id, tournament_id } = tourUnitList[i]
          await removeTourUnitDiscipline( id )
          await removeTournamentUnit( id, tournament_id )
      }
      await removeFromDB( "current_unit", unit )
    },
    async onSettled(data, error, variables, context) {
      await queryClient.invalidateQueries() 
    },
  })

  return (
    <NavButtonItem 
      title = { title }
      onclick={ (e) => {
        e.preventDefault()
        mutate.mutate()
        setisVisibleMenu( false )
        navTo( "unit_list", "")
      }}
    />
  )
}