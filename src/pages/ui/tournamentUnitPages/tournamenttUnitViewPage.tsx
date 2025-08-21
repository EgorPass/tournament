import { TournamentUnitInfo } from "../../../entities/unit"
import { LinksBlock, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { TournamentUnitHeaderWidget } from "../../../widgets/headerWidgets"
import { useTournamentUnitData } from "../../model/tournamentUnit/useTournamentUnitData"

const TournamentUnitViewPage = suspenseHOCWrapper(
  () => {
    const {  isSuccess, unit, tournamentUnit, disciplines } = useTournamentUnitData()

    if( isSuccess )
    return (
      <>
        <TournamentUnitHeaderWidget />
        <ScrollContainerWrapper>
          <TournamentUnitInfo 
            unit = { unit! }
            tournamentUnit = { tournamentUnit! }
          />
          <LinksBlock head="Заявленные дисциплины">
            {
              disciplines.map( it => (
                <div 
                  key = { it.id }
                > { it.name }</div>
              ))
            }
          </LinksBlock>
        </ScrollContainerWrapper>
      </>
    )
    else return null
  }
)
export default TournamentUnitViewPage