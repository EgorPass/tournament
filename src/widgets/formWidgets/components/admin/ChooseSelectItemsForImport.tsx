import { useForm } from "react-final-form"
import { FC, MouseEvent } from "react"
import { FormRowComponentWithTitle } from "../generic/formRowComponentWithTitle"

export const ChooseSelectItemsForImport:FC<{field: string, title: string }> = ({field, title}) => {
  const form = useForm()
  return (
    <FormRowComponentWithTitle title = { title }>
      <div>
        <div
          onClick = { (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            form.change(field, "all")
          } }
        >
          Выбрать всех
        </div>
        <div
          onClick = { (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            form.change(field, "none")
          } }
        >
          Чистый список
        </div>
      </div>
    </FormRowComponentWithTitle>   
  )
}