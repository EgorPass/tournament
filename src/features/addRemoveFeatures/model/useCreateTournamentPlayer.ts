import { getFullUnitName } from "../../../entities/unit/lib/getFullUnitName"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { apiForCreateData } from "../../../shared/lib/api/apiForCreateData"
import { useDBGetMethods, useDBSetMethods } from "../../../shared/store/offlineDB"
import { ITournamentPlayer, ITournamentUnit, ITournamentUnitDiscipline, IUnit } from "../../../types"

export const useCreateTournamentPlayer = ( tournament_id: string) => {

  const { currentNodeId } = useLocationHooks()
  const { getItemsFromDB, getItemFromDB } = useDBGetMethods()
  const { addToDB } = useDBSetMethods()

  return async() => {
    // const tournament_player: ITournamentPlayer[] = []
    const tournament_unit = await getItemsFromDB<ITournamentUnit>("tournament_unit", "tournament_id", currentNodeId ) 
    const tournament_unit_discipline = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "tournament_id", currentNodeId )

    for( 
      let i = 0, len = tournament_unit_discipline.length;
      i < len; i++
    ) {
      const { 
        tournament_unit_id, current_unit_id, discipline_id,
      } = tournament_unit_discipline[i]

      const tour_unit = tournament_unit.find( it => it.id === tournament_unit_id )

      const unit = await getItemFromDB<IUnit>("current_unit", "id", current_unit_id )
     
      const tour_player = apiForCreateData.createTournamentPlayer({
        tour_unit: tour_unit!, unit: unit!, tournament_id, discipline_id
      })

      const tour_play_res = await addToDB<ITournamentPlayer>("tournament_player", tour_player )
      // tournament_player.push( ...tour_play_res )      
    }

  }

}