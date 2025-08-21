import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { tryCondition } from "../../config/level/tryContdition";

export const LevelTryFormWidget = () => (
  <FormRowAtRadio title = "Cледование попыток:" radioList = { tryCondition } />

)