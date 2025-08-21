import { Fragment } from "react/jsx-runtime";
import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { GroupContentHead } from "../../../../shared/components/heads";
import { tournamentMainData } from "../../config/tournament/tournamentMainData";
import { FormRowDate } from "../../components/generic/formRow/formRowDate";
import { FormRowText } from "../../components/generic/formRow/formRowText";

export const TournamentDataFormWidget = () => (
  <GroupContentWrapper>
    <GroupContentHead>Реквизиты соревнования</GroupContentHead>
    {
      tournamentMainData.map(( it )=> (
        <Fragment
          key = { it.title }
        >
          { it.type === "date" && ( 
            <FormRowDate {...it} />
          )}
          { it.type === "text" && (
            <FormRowText {...it} />
          )}
        </Fragment>
      ))
    }
  </GroupContentWrapper>
)