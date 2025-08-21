import { FormRowText } from "../../components/generic/formRow/formRowText";
import { unitName } from "../../config/currentUnit/unitName";

export const CurrentUnitNameFormWidget = () => (
  <>
    {
      unitName.map( it => (
        <FormRowText { ...it } key = { it.name } />
      ))
    }
  </>
)