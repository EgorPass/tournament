import { UnitInfoBlock } from "../../../entities/unit"
import { useCurrentUnitData } from "../../model/Unit/useCurrentUnitData"
import { GroupContentWrapper, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { CurrentUnitHeaderWidget } from "../../../widgets/headerWidgets"
import { GroupContentHead } from "../../../shared/components/heads"
import { TournamentUnitChooseDisciplineFromWidget, TournamentUnitChooseTournamentFormWidget } from "../../../widgets/formWidgets"
import { suspenseHOCWrapper } from "../../../shared/HOCs"


const TourUnitFromUnit = suspenseHOCWrapper(
  () => {

    console.log( "tour unit form unit ")
    const { unit, isSuccess } = useCurrentUnitData()

    if( isSuccess )
    return (
      <>
        <CurrentUnitHeaderWidget />
        <ScrollContainerWrapper>
          <form>
            <UnitInfoBlock unit = { unit! } type = "current_unit"/>
            <GroupContentWrapper>
              <GroupContentHead>Выбор соревнований и дисциплин</GroupContentHead>
              <TournamentUnitChooseTournamentFormWidget />
              <TournamentUnitChooseDisciplineFromWidget />
            </GroupContentWrapper>
          </form>
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)

export default TourUnitFromUnit