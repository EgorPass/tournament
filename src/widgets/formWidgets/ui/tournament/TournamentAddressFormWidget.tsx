import { Fragment } from "react/jsx-runtime";
import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { GroupContentHead } from "../../../../shared/components/heads";
import { tournamentAddressData } from "../../config/tournament/tournamentAddressData";
import { FormRowText } from "../../components/generic/formRow/formRowText";
import { FormRowNumber } from "../../components/generic/formRow/formRowNumber";

export const TournamentAddressFormWidget = () => (
  <GroupContentWrapper>
    <GroupContentHead>Адрес соревнования</GroupContentHead>
    {
      tournamentAddressData.map(( { title, name, type, placeholder} )=> (
        <Fragment
          key = { name } 
        >
          { 
            type === "text"  && (
              <FormRowText
                title = { title }
                name = { `address.${ name }` }
                placeholder = { placeholder }
                valid = { false }
              />
          ) }
          {
            type === "number" && (
              <FormRowNumber
                title = { title }
                name = { `address.${name}` }
                placeholder = { placeholder! }
                valid = { false }
              />
          ) }
        </Fragment>
      ))
    }
  </GroupContentWrapper>
)