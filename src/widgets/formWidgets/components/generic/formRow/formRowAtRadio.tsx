import { FC, ReactNode } from "react";
import { RadioList } from "../list/radioList";
import { FormRowComponentWithTitle } from "../formRowComponentWithTitle";

type IRadio = { [key: string]: string }

interface IFormRowAtRadio {
  radioList: IRadio[]
  title: string
  children?: ReactNode
}

export const FormRowAtRadio: FC<IFormRowAtRadio> = ({ title, radioList, children }) => (
  <FormRowComponentWithTitle title = { title }>
    <RadioList list = { radioList }>{ children }</RadioList>
  </FormRowComponentWithTitle>
)