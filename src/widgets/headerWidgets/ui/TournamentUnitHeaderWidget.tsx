import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem";
import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { ITournament, ITournamentUnit } from "../../../types";
import { MainHeader } from "../components/mainHeader";

export const TournamentUnitHeaderWidget = suspenseHOCWrapper (
   () => {
    const { currentNodeId} = useLocationHooks()
    const { data: tournamentUnit } = useGetSuspenseStateItem<ITournamentUnit>("tournament_unit", "id", currentNodeId )
    const { data: tournament } = useGetSuspenseStateItem<ITournament>( "tournament", "id", tournamentUnit!.tournament_id )

    return (
      <MainHeader
        secondTitle = { tournament!.name }  
        firstTitle= { `Участник № ${ tournamentUnit!.number}` }  
      />
    )
  }
)