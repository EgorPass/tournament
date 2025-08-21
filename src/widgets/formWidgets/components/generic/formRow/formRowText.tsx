import { FC } from "react";
import { FormRowComponentWithTitle } from "../formRowComponentWithTitle";
import { InputText } from "../../../../../shared/components/inputFields/inputText";

export const FormRowText: FC<{title?: string, name: string, placeholder?: string, valid?: boolean}> = ({name, placeholder, title, valid = true}) => (
  <FormRowComponentWithTitle title = { title! } >
    <InputText name = { name } placeholder = { placeholder } valid = { valid } />
  </FormRowComponentWithTitle>
)