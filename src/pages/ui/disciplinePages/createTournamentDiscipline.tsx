import { GroupContentWrapper, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { GroupContentHead } from "../../../shared/components/heads"
import { useDisciplineCreateData } from "../../model/discipline/useDisciplineCreateData"
import { DisciplineHeaderWidget } from "../../../widgets/headerWidgets"
import { DisciplineConditionFormWidget, DisciplineCreateCategoryFormWidget, DisciplineCreateDQSFormWidget, DisciplineNameFormWidget } from "../../../widgets/formWidgets"

const CreateTournametDiscipline = () => {
  const { isSuccess} = useDisciplineCreateData()
  if( isSuccess )
  return (
    <>
        <DisciplineHeaderWidget />
        <ScrollContainerWrapper>
          <form>
            <DisciplineNameFormWidget />
            <GroupContentWrapper>
              <GroupContentHead>Парвила дисциплины</GroupContentHead>
                <DisciplineConditionFormWidget />
                <DisciplineCreateCategoryFormWidget />
                <DisciplineCreateDQSFormWidget />
            </GroupContentWrapper>
          </form>
        </ScrollContainerWrapper>
      </>
  )
  return null
  }
export default CreateTournametDiscipline