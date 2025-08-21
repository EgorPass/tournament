import { FC } from "react";
import { CheckboxList } from "../list/checkboxList";
import { FormRowComponentWithTitle } from "../formRowComponentWithTitle";

export const FormRowAtCheckbox: FC<{title: string, name: string, checkboxList: string[]}> = ({title, name, checkboxList}) => (
  <FormRowComponentWithTitle title = { title }>
     <CheckboxList name = { name } checkboxlist = { checkboxList } />
  </FormRowComponentWithTitle>
)