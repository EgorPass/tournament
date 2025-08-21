import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { FormRowText } from "../../components/generic/formRow/formRowText";
import { levelName } from "../../config/level/levelName";

export const LevelNameFormWidget = () => (
  <GroupContentWrapper>
    <FormRowText { ...levelName }/>
  </GroupContentWrapper>
)