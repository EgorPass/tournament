import { OptionItem } from "../../../../shared/components/inputFields/optionItem"
import { suspenseHOCWrapper } from "../../../../shared/HOCs"
import { FormRowAtSelect } from "../../components/generic/formRow/formRowAtSelect"
import { useGetLevelResult } from "../../model/level/useGetLevelResult"

export const CreateBaseFromLevelResultContainer = suspenseHOCWrapper(
  ( ) => {
    const { levels } = useGetLevelResult( )  
    return (
      <>
        <FormRowAtSelect title = "Этап:" name = "fromResult.level">
          {
            levels?.map( it => (
              <OptionItem key = { it.id } value = {it.id} title = { it.name } />
            ))
          }
        </FormRowAtSelect> 
      </>
    )
  }
)