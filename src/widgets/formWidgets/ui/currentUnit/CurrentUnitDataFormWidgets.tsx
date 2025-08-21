import { FormRowDate } from "../../components/generic/formRow/formRowDate"
import { FormRowNumber } from "../../components/generic/formRow/formRowNumber"
import { FormRowText } from "../../components/generic/formRow/formRowText"

export const CurrentUnitWeightFormWidget = () => (
  <FormRowNumber title = "вес" name = "weight" />
)

export const CurrentUnitDateFormWidget = () => (
  <FormRowDate title = "Дата рождения" name = "birthday" />
)

export const CurrentUnitBornCityFormWidget = () => (
  <FormRowText title = "Город рождения" name = "borncity" />
)