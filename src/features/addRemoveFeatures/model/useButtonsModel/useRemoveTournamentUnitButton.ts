import { useMutationButtonData } from "./useMutationButtonData"
import { ITournamentUnit } from "../../../../types"
import { useMutateButton } from "./useMutateButton"
import { setBackDataToMutation } from "../../lib/setBackDataToMutation"

export const useRemoveTournamentUnitButton = () => {
  const {  
    currentNodeId, getItemFromDB, 
    removeTourUnitDiscipline, removeTournamentUnit,  
  } = useMutationButtonData()

  return useMutateButton({
    func: async( ) => {
      const tourUnit = await getItemFromDB<ITournamentUnit>("tournament_unit", "id", currentNodeId )
      await removeTourUnitDiscipline( currentNodeId )
      await removeTournamentUnit( currentNodeId, tourUnit!.tournament_id )
      return setBackDataToMutation( "tournament", tourUnit!.tournament_id, [
        ["tournament_unit", { "tournament_id": tourUnit!.tournament_id }],
        // [ "tournament", { "id": tourUnit.tournament_id } ]
        // [ "current_unit", { "id": tourUnit.current_unit_id } ]
      ] )
    }
  })
}