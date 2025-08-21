import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem";
import { useGetSuspenseStateStore } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore";
import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { IDiscipline, ITournament, IUnit } from "../../../types";

export const useAddData = () => {
  const { fromPathname, fromId } = useLocationHooks();
  const { data: discipline, isSuccess: disciplineIsSuccess } = useGetSuspenseStateItem<IDiscipline>(fromPathname, "id", fromId )
  const { data: tournament, isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>("tournament", "id", discipline!.tournament_id )
  const { data: units, isSuccess: unitIsSuccess } = useGetSuspenseStateStore<IUnit>( "current_unit" ) 
  const isSuccess = disciplineIsSuccess && tournamentIsSuccess && unitIsSuccess 
  return {
    isSuccess, units, discipline, tournament
  }
}