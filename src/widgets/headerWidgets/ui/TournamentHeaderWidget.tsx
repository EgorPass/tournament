import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { ITournament } from "../../../types";
import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData";
import { MainHeader } from "../components/mainHeader";

export const TournamentHeaderWidget = () => {
  const getQueryData = useGetQueryData()
  const { titleMod, pathnameType } = useLocationHooks()
  const tournament = getQueryData<ITournament>("tournament", "id")
  
  const tournament_name = pathnameType === "create" ? `${ titleMod } соревнование` : !!tournament ? tournament.name : "Соревнование"

  return (
    <MainHeader 
      firstTitle = { tournament_name  }  
    />
  ) 
}