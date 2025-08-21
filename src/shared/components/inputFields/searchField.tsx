import { ChangeEvent, FC, FormEventHandler } from "react";
import { StyleWrapperForTextBox } from "./styleWrapperForTextBox";


interface ISearchField {
  value: string,
  onchange: ( e: ChangeEvent<HTMLInputElement> ) => void
  placeholder?: string
  onsubmit?: FormEventHandler
}

export const SearchField: FC<ISearchField> = ({ value, onchange, onsubmit = undefined, placeholder = "" }) => {

  return (
    <StyleWrapperForTextBox>
      <input
        title = { placeholder }
        type = "text"
        onSubmit = { onsubmit }
        onChange = { onchange }
        value = { value }
        placeholder = { placeholder }
      />
    </StyleWrapperForTextBox>
  )
}