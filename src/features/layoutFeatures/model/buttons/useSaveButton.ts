import { useRFFState } from "../useRFFState";

export const useSaveButton = () => {
  const { form, formState } = useRFFState()
  const disabled = formState.submitting
  const submit = async () => {
    try{
      await form!.submit();
    }
    catch(e) {
      console.log( "fuck you")
    }
    finally {
      form.reset( formState.initialValues )
    }
  }
  return { submit, disabled }
}