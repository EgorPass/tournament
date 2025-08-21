import { FC } from "react";
import { FormRowComponentWithTitle } from "../formRowComponentWithTitle";
import { InputDate } from "../../../../../shared/components/inputFields/inputDate";

export const FormRowDate: FC<{title?: string, name: string}> = ({title, name}) => (
  <FormRowComponentWithTitle title = { title! } >
    <InputDate name = { name } />
  </FormRowComponentWithTitle>
)