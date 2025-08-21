import { FC, ReactNode } from "react";
import { FormRowComponentWithTitle } from "../formRowComponentWithTitle";
import { SelectInput } from "../../../../../shared/components/inputFields/selectInput";
import { OptionItem } from "../../../../../shared/components/inputFields/optionItem";

export const FormRowAtSelect:FC<{title: string, name: string, children: ReactNode}> = ({ title, name, children }) =>(
  <FormRowComponentWithTitle title = { title }>
    <SelectInput name = { name }>
      <OptionItem value = "" title = "" />
      { children }
    </SelectInput>
  </FormRowComponentWithTitle>
)