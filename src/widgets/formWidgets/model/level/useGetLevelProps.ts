import { ILevel } from "../../../../types"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useForm, useFormState } from "react-final-form"

export const useGetLevelProps = () => {
  const form = useForm()
  const { values, initialValues } = useFormState()
  const level = values as ILevel
  const { currentNodeId, fromId , createDatafromData, saveChangeData } = useLocationHooks()
  const discipline_id = fromId !== currentNodeId ? fromId : level.discipline_id
  return {
    discipline_id,
    form, values: level, initialValues,
    saveChangeData, createDatafromData 
  }
}