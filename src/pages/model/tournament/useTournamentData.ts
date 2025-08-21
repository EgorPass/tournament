import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament } from "../../../types"


export const useTournamentData = () => {

  const { currentNodeId } = useLocationHooks()  
  const { data: tournament, isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>( "tournament", "id", currentNodeId! )
  const { data: disciplines, isSuccess: disciplinesIsSuccess } = useGetSuspenseStateList<IDiscipline>( "discipline", "tournament_id", currentNodeId! )

  const isSuccess = tournamentIsSuccess && disciplinesIsSuccess

  return { tournament, disciplines, isSuccess }

}