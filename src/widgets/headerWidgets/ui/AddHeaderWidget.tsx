import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournament } from "../../../types"
import { MainHeader } from "../components/mainHeader"

export const AddHeaderWidget = () => {
  const { fromId } = useLocationHooks()
  const getQueryData = useGetQueryData()
  const discipline = getQueryData<IDiscipline>("discipline", "id", fromId )
  const tournament = getQueryData<ITournament>("tournament", "id", discipline.tournament_id )
  const discipline_name = !!discipline ? discipline.name : "дисциплина"
  const tournament_name = !!tournament ? tournament.name : "соревнование"
  return (
    <MainHeader 
      thirdTitle = { tournament_name }
      secondTitle = { discipline_name }
      firstTitle = "Добавить участника"
    />
  )
}