import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament } from "../../../types"
import { MainHeader } from "../components/mainHeader"

export const AddHeaderWidget = () => {
  const { fromPathname, fromId } = useLocationHooks()
  const { data: discipline, isSuccess: disciplineIsSuccess } = useGetSuspenseStateItem<IDiscipline>(fromPathname, "id", fromId )
  const { data: tournament, isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>("tournament", "id", discipline!.tournament_id )
  const discipline_name = disciplineIsSuccess ? discipline!.name : "дисциплина"
  const tournament_name = tournamentIsSuccess ? tournament!.name : "соревнование"
  return (
    <MainHeader 
      thirdTitle = { tournament_name }
      secondTitle = { discipline_name }
      firstTitle = "Добавить участника"
    />
  )
}