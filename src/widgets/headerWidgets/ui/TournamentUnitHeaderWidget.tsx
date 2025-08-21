import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData";
import { ITournament, ITournamentUnit } from "../../../types";
import { MainHeader } from "../components/mainHeader";

export const TournamentUnitHeaderWidget = () => {
  const getQueryData = useGetQueryData()
  const tournamentUnit = getQueryData<ITournamentUnit>("tournament_unit", "id" )
  const tournament = getQueryData<ITournament>( "tournament", "id", tournamentUnit.tournament_id )

  return (
    <MainHeader
      secondTitle = { tournament.name }  
      firstTitle= { `Участник № ${ tournamentUnit.number}` }  
    />
  )
}