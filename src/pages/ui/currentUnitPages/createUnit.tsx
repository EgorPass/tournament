import { GroupContentWrapper, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { CurrentUnitBornCityFormWidget, CurrentUnitDateFormWidget, CurrentUnitGenderFormWidget, CurrentUnitNameFormWidget, CurrentUnitWeightFormWidget } from "../../../widgets/formWidgets"
import { CurrentUnitHeaderWidget } from "../../../widgets/headerWidgets"

const CreateUnit = () => (
  <>
    <CurrentUnitHeaderWidget />
    <ScrollContainerWrapper>
      <GroupContentWrapper>
        <CurrentUnitNameFormWidget />
        <CurrentUnitGenderFormWidget />
        <CurrentUnitDateFormWidget />
        <CurrentUnitWeightFormWidget />
        <CurrentUnitBornCityFormWidget />
      </GroupContentWrapper>
    </ScrollContainerWrapper>
  </>
)
export default CreateUnit