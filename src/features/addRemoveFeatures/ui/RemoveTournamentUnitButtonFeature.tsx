import { NavButtonItem } from "../components/navButtonItem";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMutationButtonData } from "../model/useButtonsModel/useMutationButtonData";
import { ITournamentUnit } from "../../../types";
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem";
import { suspenseHOCWrapper } from "../../../shared/HOCs";

export const RemoveTournamentUnitButtonFeature = suspenseHOCWrapper(
 ({ title }: { title: string }) => {
  const { setisVisibleMenu } = useSetIsVisibleMenu()
  // const navigate = useNavigate();
  const queryClient = useQueryClient() 
  const {  
    currentNodeId,  navTo,
    removeTourUnitDiscipline, removeTournamentUnit,  
  } = useMutationButtonData()

  const { data: tournamentUnit, isSuccess: tourUnitIsSuccess } = useGetSuspenseStateItem<ITournamentUnit>( "tournament_unit", "id", currentNodeId! )
  
  const mutate = useMutation({
    mutationFn: async ( ) => {
      await removeTourUnitDiscipline( currentNodeId )
      await removeTournamentUnit( currentNodeId, tournamentUnit!.tournament_id )
    },
    async onSettled() {
      await queryClient.invalidateQueries()
    },
  })

  if( tourUnitIsSuccess ) {

    return (
      <NavButtonItem 
      title = { title }
      onclick={ (e) => {
        e.preventDefault()
        mutate.mutate( )
        setisVisibleMenu( false )
        navTo( "tournament", tournamentUnit!.tournament_id )
      }} 
      />
    )
  }
  else return null
}
)