import { useMutationButtonData } from "./useMutationButtonData"
import { ITournamentUnit, IUnit } from "../../../../types"
import { useMutateButton } from "./useMutateButton"
import { setBackDataToMutation } from "../../lib/setBackDataToMutation"

export const useRemoveUnitButton = () => {
  const {  
    currentNodeId,
    getItemFromDB, getItemsFromDB, removeFromDB, removeTourUnitDiscipline, removeTournamentUnit,  
  } = useMutationButtonData()
  
  return useMutateButton({
    func: async() => {
      const unit = await getItemFromDB<IUnit>("current_unit", "id", currentNodeId)
      const tourUnitList = await getItemsFromDB<ITournamentUnit>("tournament_unit","current_unit_id", unit!.id )
      
      for( let i = 0, len = tourUnitList.length; i < len; i++) {
        const { id, tournament_id } = tourUnitList[i]
        await removeTourUnitDiscipline( id )
        await removeTournamentUnit( id, tournament_id )
      }
      await removeFromDB( "current_unit", unit )
      return setBackDataToMutation( "unit_list", null, [
        ["current_unit"]
      ])
    }
  })
}