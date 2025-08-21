import { useRFFState } from "../../../../features/layoutFeatures/model/useRFFState"

export const useReset = () => {
  const { form, formState } = useRFFState() 
  const reset = () => {
    form.reset( formState.initialValues )
  }
  return reset 
}