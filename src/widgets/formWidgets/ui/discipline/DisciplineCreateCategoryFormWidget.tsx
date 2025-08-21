import { CategoriesItemsComponent } from "../../components/discipline/CategoriesItemsComponent"
import { FormRowComponentForFieldArray } from "../../components/discipline/formRowComponentForFieldArray"
import { categoriesList } from "../../config/discipline/categoriesList"

export const DisciplineCreateCategoryFormWidget = () => (
  <>
    {
      categoriesList.map( ({ name, title }, i) => (
        <FormRowComponentForFieldArray
          key = { name + i }
          name = { name }
          title = { title }
          buttonTitle = "добавить категорию"
          $col = "repeat(auto-fill, 212px)"
          $rowGap="20px"
          $colGap="40px"
          mutatorField = { { from: "", to: "" }}
        >
          <CategoriesItemsComponent name = { name } />
        </FormRowComponentForFieldArray>
      ))
    }
  </>
)
