import { FC } from "react";
import { FormRowComponentWithTitle } from "../formRowComponentWithTitle";
import { InputNumber } from "../../../../../shared/components/inputFields/inputNumber";

export const FormRowNumber: FC<{title?: string, name: string, placeholder?: string, valid?: boolean}> = ({title, name, placeholder, valid = true}) => (
  <FormRowComponentWithTitle title = { title! } >
    <InputNumber name = { name } placeholder = { placeholder } valid  = { valid } />
  </FormRowComponentWithTitle>
)
