import { TournamentInfoBlock, TournamentPlayDescription } from "../../../entities/tournament"
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { TournamentHeaderWidget } from "../../../widgets/headerWidgets"
import { DisciplineLinkListWidget } from "../../../widgets/listWidgets"
import { useTournamentData } from "../../model/tournament/useTournamentData"

const PlayTournament = suspenseHOCWrapper(
  () => {
    // console.log( "render tournament play page..")
    const { isSuccess, tournament, disciplines } = useTournamentData()
    if(isSuccess) return (
      <>
        <TournamentHeaderWidget />
        <ScrollContainerWrapper>
          <TournamentInfoBlock {...tournament! }/>
          <DisciplineLinkListWidget disciplines = { disciplines }/>
          <TournamentPlayDescription />
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)
export default PlayTournament