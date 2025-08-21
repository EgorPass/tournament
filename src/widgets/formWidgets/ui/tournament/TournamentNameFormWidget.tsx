import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { FormRowText } from "../../components/generic/formRow/formRowText";
import { tournamentNameData } from "../../config/tournament/tournamentNameData";

export const TournamentNameFormWidget = () => (
  <GroupContentWrapper>
    <FormRowText { ...tournamentNameData }/>
  </GroupContentWrapper>
)