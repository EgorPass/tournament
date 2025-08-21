import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { FormRowText } from "../../components/generic/formRow/formRowText";
import { disciplineName } from "../../config/discipline/disciplineName";

export const DisciplineNameFormWidget = () => (
  <GroupContentWrapper>
    <FormRowText { ...disciplineName }/>
  </GroupContentWrapper>
)