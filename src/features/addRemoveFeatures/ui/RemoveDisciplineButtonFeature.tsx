import { NavButtonItem } from "../components/navButtonItem";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMutationButtonData } from "../model/useButtonsModel/useMutationButtonData";
import { IDiscipline, ILevel, ITournamentUnitDiscipline } from "../../../types";
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem";
import { suspenseHOCWrapper } from "../../../shared/HOCs";

export const RemoveDisciplineButtonFeature = suspenseHOCWrapper(
  ({ title } : { title:string }) => {

  const queryClient = useQueryClient()
  const { setisVisibleMenu } = useSetIsVisibleMenu()
  
  const {  
    currentNodeId,  navTo, removeTournamentUnit,  
    getItemsFromDB, removeFromDB, 
  } = useMutationButtonData()
  
  const { data: discipline, isSuccess: disciplineSuccess } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", currentNodeId )
  
  const { mutate } = useMutation({
    mutationFn: async() => {
      
      const tourUntiDiscList = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "discipline_id", currentNodeId)
      const levels = await getItemsFromDB<ILevel>("level", "discipline_id", discipline!.id)

      console.log( levels )

      for(let i = 0, len = tourUntiDiscList.length; i < len; i++) {
        const { tournament_unit_id, tournament_id } = tourUntiDiscList[i]
        const  selfDiscList = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "tournament_unit_id", tournament_unit_id )

        await removeFromDB("tournament_unit_discipline", tourUntiDiscList[i] )
        if( selfDiscList.length === 1 ) 
          await removeTournamentUnit(tournament_unit_id, tournament_id )
      }
      await removeFromDB("discipline", discipline)
      await removeFromDB( "level", levels )
    },
    async onSettled(data, error, variables, context) {
      await queryClient.invalidateQueries()
    },
  })

  if( disciplineSuccess ) {
    return (
      <NavButtonItem 
      title = { title }
      onclick = { ( e ) => {
        e.preventDefault()
        mutate( )
        setisVisibleMenu( false )
        navTo( "tournament", discipline!.tournament_id )
      } }
      />
    )
  }
  else return null
}
)