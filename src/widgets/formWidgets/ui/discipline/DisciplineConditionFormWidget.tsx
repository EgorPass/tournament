import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { disciplineCategories } from "../../config/discipline/disciplineCategories";
import { disciplineCondition } from "../../config/discipline/disciplineCondition";


export const DisciplineConditionFormWidget = () => (
  <>
    <FormRowAtRadio
      radioList = { disciplineCondition } 
      title = "Условия победы"
    />
    <FormRowAtRadio
      radioList = { disciplineCategories }
      title = "Разбивка на категории"
    />
  </>
)