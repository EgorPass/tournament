import { useDBGetMethods, useDBSetMethods } from "../../../shared/store/offlineDB"
import { ITournamentUnitDiscipline } from "../../../types";

export const useClearTournamentUnitDiscipline = () => {

  const { getItemsFromDB } = useDBGetMethods();
  const { removeFromDB } = useDBSetMethods();

  return async (tournament_unit_id: string ) => {
    const unitDisciplineList = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "tournament_unit_id", tournament_unit_id )
    
    return await removeFromDB( "tournament_unit_discipline", unitDisciplineList )
  }
}