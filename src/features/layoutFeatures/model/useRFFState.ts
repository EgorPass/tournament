import { useForm, useFormState } from "react-final-form"

export const useRFFState = () => {
  const form = useForm();
  const formState = useFormState()
  return { form, formState }
}