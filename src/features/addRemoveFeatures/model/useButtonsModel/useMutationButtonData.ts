import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useDBGetMethods, useDBSetMethods } from "../../../../shared/store/offlineDB"
import { useRemoveTournamentUnitWithLuftList } from "../useRemoveTournamentUnitWithLuftList"
import { useClearTournamentUnitDiscipline } from "../useClearTournamentUnitDiscipline"

export const useMutationButtonData = () => {
  const { currentNodeId, } = useLocationHooks()
  const { removeFromDB } = useDBSetMethods()
  const { getItemFromDB, getItemsFromDB } = useDBGetMethods()
  const removeTournamentUnit = useRemoveTournamentUnitWithLuftList()
  const removeTourUnitDiscipline = useClearTournamentUnitDiscipline()
  
  return { 
    currentNodeId, 
    removeFromDB,
    getItemFromDB, getItemsFromDB,
    removeTourUnitDiscipline, removeTournamentUnit
  }
}