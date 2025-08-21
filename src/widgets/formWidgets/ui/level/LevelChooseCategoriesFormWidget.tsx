import { Condition } from "../../../../shared/components/inputFields/condition";
import { categories } from "../../config/level/categories";
import { useLevelCategories } from "../../model/level/useLevelCategories";
import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { FormRowAtCheckbox } from "../../components/generic/formRow/formRowAtChackbox";

export const LevelChooseCategoriesFormWidget = () => {
  const { menCategories, womenCategories} = useLevelCategories()
  return (
    <>
      <FormRowAtRadio
        title = "Категории для этапа"
        radioList = { categories }
      />
      <Condition when = "categories.check" is = { ["use"] }>
        <FormRowAtCheckbox
          title = "мужской пол:"
          name = "categories.mensList"
          checkboxList = { menCategories }
        />
        <FormRowAtCheckbox 
          title = "женский пол:"
          name = "categories.womensList"
          checkboxList = { womenCategories }
        />
      </Condition>
    </>
  )
}