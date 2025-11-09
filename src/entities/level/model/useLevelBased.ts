import { IDiscipline, ILevel, ITournament } from "../../../types";
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem";
import { useGetStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateList";

export const useLevelBased = ( level: ILevel) => {
  const {
    discipline_id,
    createLevel, levelPosition,
    tournament_id,
    fromResult:{ level: levelId, discipline: disciplineId, tournament: tournamentId }
  } = level
  const fromLevelId = !!levelId ? levelId: ""
  const fromDisciplineId = !!disciplineId ? disciplineId : discipline_id
  const fromTournamentId = !!tournamentId ? tournamentId : tournament_id 
  
  const { data: fromLevel } = useGetStateItem<ILevel>( "level", "id", fromLevelId, !!level && !!fromLevelId )
  const { data: fromDiscipline } = useGetStateItem<IDiscipline>( "discipline", "id", fromDisciplineId, !!level && !!fromDisciplineId )
  const { data: fromTournament } = useGetStateItem<ITournament>( "tournament", "id", fromTournamentId, !!level && !!fromTournamentId && !!fromDisciplineId )
  const { data: levels } = useGetStateList<ILevel>( "level", "discipline_id", level!.discipline_id, !!level && ( level.createLevel === "fromPastLevel") )

  let pastLevel: ILevel | undefined = undefined  
  if( levels && levels.length > 0 && createLevel === "fromPastLevel" && +levelPosition !== 0 ) {
    pastLevel = levels.find( it => +it.levelPosition === +levelPosition - 1 )!
  }

  return {
    pastLevel: pastLevel!, createLevel,
    fromLevel, fromDiscipline, 
    fromTournament
  }
}