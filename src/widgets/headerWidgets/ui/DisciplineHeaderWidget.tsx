import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament } from "../../../types"
import { MainHeader } from "../components/mainHeader"

export const DisciplineHeaderWidget = () => {
  const { pathname, fromPathname, fromId, titleMod, pathnameType, currentNodeId } = useLocationHooks()

  const isFromDiscipline = ( fromPathname === "discipline" ) && ( fromId === currentNodeId )

  const { data: discipline, isSuccess: disciplineIsSuccess } = useGetStateItem<IDiscipline>("discipline", "id", currentNodeId, isFromDiscipline )

  const tournament_id = ( pathname === fromPathname ) && discipline ? discipline.tournament_id : fromId

  const { data: tournament, isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>("tournament", "id", tournament_id )

  const tournamentName = !!tournament ? tournament.name : ""
  const disciplineName = pathnameType === "create" ? `${ titleMod } дисциплину` : !!discipline ? discipline.name : "дисциплина"


  if( tournamentIsSuccess ) {

    return (
      <MainHeader
      secondTitle = { tournamentName }
      firstTitle = { disciplineName  }
      />
    )
  }
  else return null
}