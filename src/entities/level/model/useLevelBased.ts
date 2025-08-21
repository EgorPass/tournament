import { IDiscipline, ILevel, ITournament } from "../../../types";
import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData";

export const useLevelBased = ( level: ILevel) => {
  const getQueryData = useGetQueryData()
  const {
    createLevel, levelPosition,
    fromResult:{ level: levelId, discipline: disciplineId, tournament: tournamentId }
  } = level
  const fromLevelId = !!levelId ? levelId: " "
  const fromDisciplineId = !!disciplineId ? disciplineId : " "
  const fromTournamentId = !!tournamentId ? tournamentId : " "
  const fromLevel = getQueryData<ILevel>( "level", "id", fromLevelId  )
  const fromDiscipline = getQueryData<IDiscipline>( "discipline", "id", fromDisciplineId )
  const fromTournament = getQueryData<ITournament>( "tournament", "id", fromTournamentId )
  const levels = getQueryData<ILevel[]>( "level", "discipline_id", level.discipline_id )

  let pastLevel: ILevel 
  if( levels && levels.length > 0 && createLevel === "fromPastLevel" && +levelPosition !== 0 ) {
    pastLevel = levels.find( it => +it.levelPosition === +levelPosition - 1 )!
  }

  return {
    pastLevel: pastLevel!, createLevel,
    fromLevel, fromDiscipline, fromTournament
  }
}