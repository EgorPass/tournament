import { FormRowComponentForFieldArray } from "../../components/discipline/formRowComponentForFieldArray"
import { DqItemsComponent } from "../../components/discipline/DqItemsComponent"

export const DisciplineCreateDQSFormWidget = () =>  (
  <FormRowComponentForFieldArray
    name = "dqs"
    title = "Виды штрафов"
    buttonTitle = "добавить штраф"
    $col = "repeat(auto-fill, 309px)"
    $rowGap="40px"
    $colGap="80px"
    mutatorField = { { name: "", type: "", qual: "", description: "", reiting: [] } }
  >
    <DqItemsComponent name = "dqs" />
  </FormRowComponentForFieldArray>
)
