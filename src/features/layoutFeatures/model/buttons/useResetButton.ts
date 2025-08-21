import { useRFFState } from "../useRFFState"

export const useResetButton = () => {
  const { form, formState } = useRFFState()
  // const disabled = formState.submitting || formState.pristine
  const disabled = formState.submitting
  
  const reset = () => { form!.reset() }
  return { reset, disabled }
}