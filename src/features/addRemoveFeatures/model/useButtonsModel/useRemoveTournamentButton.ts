import { useMutationButtonData } from "./useMutationButtonData"
import { IDiscipline, ITournament, ITournamentUnit } from "../../../../types"
import { useMutateButton } from "./useMutateButton"
import { setBackDataToMutation } from "../../lib/setBackDataToMutation"

export const useRemoveTournamentButton = () => {
  const {  
    currentNodeId,
    getItemFromDB, getItemsFromDB, removeFromDB, removeTourUnitDiscipline, removeTournamentUnit,  
  } = useMutationButtonData()

  return useMutateButton({
    func: async() => {
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
      return setBackDataToMutation( "tournaments", null )
    }
  })

}