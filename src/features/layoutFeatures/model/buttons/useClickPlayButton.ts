import { useForm, useFormState } from "react-final-form"

export const useClickPlayButton = () => {
  const form = useForm()
  const formState = useFormState()
  return async( action: string ) => {
    
    // проверяем есть ли пустые поля форм с DQ
    // если есть то ни чего не делаем
    if( action !== "skip" && !formState.valid ) return false 
    form.change( "buttonType", action )
          console.log( "before submit")
    await form.submit();
          console.log( "after submit")

          // из за этого reset делает какуюто дичь
          // form.reset();
  }
}