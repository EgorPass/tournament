import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useGetSuspenseStateItemsFromList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItemsFromList"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament, ITournamentUnit, ITournamentUnitDiscipline, IUnit } from "../../../types"

export const useTournamentUnitData = () => {
  const { currentNodeId } = useLocationHooks()

  const { data: tournamentUnit, isSuccess: tourUnitIsSuccess } = useGetSuspenseStateItem<ITournamentUnit>( "tournament_unit", "id", currentNodeId! )
  const { data: unit, isSuccess: unitIsSuccess } = useGetSuspenseStateItem<IUnit>("current_unit", "id", tournamentUnit!.current_unit_id)
  const { data: tournament, isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>("tournament", "id", tournamentUnit!.tournament_id )
  
  const { data: tour_unit_disc, isSuccess: tourUnitDiscIsSuccess } = useGetSuspenseStateList<ITournamentUnitDiscipline>( "tournament_unit_discipline", "tournament_unit_id", currentNodeId! )
  const disciplineQueries = useGetSuspenseStateItemsFromList<ITournamentUnitDiscipline, IDiscipline>( tour_unit_disc, "discipline", "id", "discipline_id"  )
  console.log( disciplineQueries )

  const disciplineIsSuccess = disciplineQueries.map( it => it.isSuccess ).every( it => it === true )
  const isSuccess = tourUnitIsSuccess && unitIsSuccess && tournamentIsSuccess && disciplineIsSuccess

  const disciplines: IDiscipline[] = disciplineQueries.map( it => it.data as IDiscipline );

  return { isSuccess, unit, tournamentUnit, disciplines, tournament }
}