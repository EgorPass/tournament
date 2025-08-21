import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament } from "../../../types"
import { MainHeader } from "../components/mainHeader"

export const DisciplineHeaderWidget = () => {
  const getQueryData = useGetQueryData()
  const { pathname, fromPathname, fromId, titleMod, pathnameType } = useLocationHooks()
  const discipline  = getQueryData<IDiscipline>("discipline","id",  )
  const tournament_id = ( pathname === fromPathname ) && discipline ? discipline.tournament_id : fromId
  const tournament  = getQueryData<ITournament>("tournament","id", tournament_id )

  const tournamentName = tournament.name
  const disciplineName = pathnameType === "create" ? `${titleMod} дисциплину` : !!discipline ? discipline.name : "дисциплина"

  return (
      <MainHeader
        secondTitle = { tournamentName }
        firstTitle = { disciplineName  }
      />
    )
}