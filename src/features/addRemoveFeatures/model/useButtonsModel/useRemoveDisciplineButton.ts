import { useMutationButtonData } from "./useMutationButtonData"
import { IDiscipline, ITournamentUnitDiscipline } from "../../../../types"
import { useMutateButton } from "./useMutateButton"
import { setBackDataToMutation } from "../../lib/setBackDataToMutation"

export const useRemoveDisciplineButton = () => {
  const {  
    currentNodeId, removeTournamentUnit,  
    getItemFromDB, getItemsFromDB, removeFromDB, 
  } = useMutationButtonData()

  return useMutateButton({
    func: async() => {
      console.log( "remove discipline")
      const discipline = await getItemFromDB<IDiscipline>("discipline","id", currentNodeId )
      
      const tourUntiDiscList = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "discipline_id", currentNodeId)

      for(let i = 0, len = tourUntiDiscList.length; i < len; i++) {
        const { tournament_unit_id, tournament_id } = tourUntiDiscList[i]
        const  selfDiscList = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "tournament_unit_id", tournament_unit_id )

        await removeFromDB("tournament_unit_discipline", tourUntiDiscList[i] )
        if( selfDiscList.length === 1 ) 
          await removeTournamentUnit(tournament_unit_id, tournament_id )
      }
      await removeFromDB("discipline", discipline)
      return setBackDataToMutation( "tournament", discipline!.tournament_id )
    },
  })
}