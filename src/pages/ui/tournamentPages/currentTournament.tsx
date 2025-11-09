import { TournamentInfoBlock } from "../../../entities/tournament"
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { TournamentHeaderWidget } from "../../../widgets/headerWidgets"
import { DisciplineLinkListWidget, TournamentUnitDnDListWidget } from "../../../widgets/listWidgets"
import { useTournamentData } from "../../model/tournament/useTournamentData"

const CurrentTournament = suspenseHOCWrapper(
  () => {
    // console.log( "render tournamant page...")
    const { isSuccess, tournament, disciplines } = useTournamentData()
    if( isSuccess ) return (
      <>
        <TournamentHeaderWidget />
        <ScrollContainerWrapper className = "drag-content">
          <TournamentInfoBlock {...tournament! } />
          <DisciplineLinkListWidget disciplines = { disciplines }/>
          <TournamentUnitDnDListWidget /> 
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)
export default CurrentTournament