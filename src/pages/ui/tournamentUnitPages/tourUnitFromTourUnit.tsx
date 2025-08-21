import { GroupContentWrapper, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { useTournamentUnitData } from "../../model/tournamentUnit/useTournamentUnitData"
import { TournamentUnitInfo } from "../../../entities/unit"
import { TournamentUnitHeaderWidget } from "../../../widgets/headerWidgets"
import { TournamentUnitChooseDisciplineFromWidget } from "../../../widgets/formWidgets"

const TourUnitFromTourUnit = suspenseHOCWrapper(
 () => {
    const { isSuccess, unit, tournamentUnit  } = useTournamentUnitData()
    if( isSuccess )
    return(
      <>
        <TournamentUnitHeaderWidget />
        <ScrollContainerWrapper>
          <form>
            <TournamentUnitInfo 
              unit = { unit! }
              tournamentUnit = { tournamentUnit! }
            />
            {/* <GroupContentWrapper> */}
              <TournamentUnitChooseDisciplineFromWidget />
            {/* </GroupContentWrapper> */}
          </form>
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)

export default TourUnitFromTourUnit