import { OptionItem } from "../../../../shared/components/inputFields/optionItem"
import { suspenseHOCWrapper } from "../../../../shared/HOCs"
import { FormRowAtSelect } from "../../components/generic/formRow/formRowAtSelect"
import { useGetDisciplineResult } from "../../model/level/useGetDisciplineResult"


export const CreateBaseFromDisciplineResultContainer = suspenseHOCWrapper( 
  () => {
    const { tournaments, disciplines } = useGetDisciplineResult()
    return (
      <>
        <FormRowAtSelect title = "Соревнование:" name = "fromResult.tournament">
          {
            tournaments?.map( it => (
              <OptionItem key = { it.id } value = {it.id} title = { it.name } />
            ))
          }
        </FormRowAtSelect>
        <FormRowAtSelect title = "Дисциплина:" name = "fromResult.discipline">
          {
            disciplines?.map( it => (
              <OptionItem key = {it.id} value = {it.id} title = { it.name }/>
            ))
          }
        </FormRowAtSelect>
      </>
    )
  }
)