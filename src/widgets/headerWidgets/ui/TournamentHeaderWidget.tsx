import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { ITournament } from "../../../types";
import { MainHeader } from "../components/mainHeader";
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem";
import { suspenseHOCWrapper } from "../../../shared/HOCs";

export const TournamentHeaderWidget = suspenseHOCWrapper(
  () => {
    const { titleMod, pathnameType, currentNodeId } = useLocationHooks()
    
    const isCreate = pathnameType === "create"
    const isId = !!currentNodeId
    const { data: tournament }= useGetStateItem<ITournament>("tournament", "id", currentNodeId, ( !isCreate || isId ) )
    


    const tournament_name = pathnameType === "create" ? `${ titleMod } соревнование` : !!tournament ? tournament.name : "Соревнование"

    return (
      <MainHeader 
        firstTitle = { tournament_name  }  
      />
    ) 
  }
)