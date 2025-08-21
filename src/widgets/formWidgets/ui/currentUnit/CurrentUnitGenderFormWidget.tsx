import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio"
import { unitGender } from "../../config/currentUnit/unitGender"

export const CurrentUnitGenderFormWidget = () => <FormRowAtRadio title = "Пол" radioList = { unitGender } />