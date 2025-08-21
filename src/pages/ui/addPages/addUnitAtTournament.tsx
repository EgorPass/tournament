import { UnitSearchFilterFeature } from "../../../features/searchFilterFeatures"
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { AddHeaderWidget } from "../../../widgets/headerWidgets"
import { AddToDisciplineUnitListWidget } from "../../../widgets/listWidgets"
import { useAddData } from "../../model/addUnit/useAddData"

const AddUnitAtTournament = suspenseHOCWrapper(
  () => {
    
    const { isSuccess, discipline, tournament } = useAddData()
    if( isSuccess )
    return (
      <>
        <AddHeaderWidget />
        <UnitSearchFilterFeature />
        <ScrollContainerWrapper>
          <AddToDisciplineUnitListWidget 
            discipline_id = { discipline!.id }
            tournament_id = { tournament!.id }
          />
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)

export default AddUnitAtTournament