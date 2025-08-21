import { FC, ReactNode } from "react";
import { RadioList } from "../generic/list/radioList";
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem";
import { Condition } from "../../../../shared/components/inputFields/condition";

interface IChooseItemForExport {
  value: string,
  children?: ReactNode,
  list: Array<{[key: string]: string }>
}

export const ChooseItemForExport:FC<IChooseItemForExport> = ({value, children, list}) =>  (
  <>
    <Checkbox
      name = "typeForExport"
      value = { value }
      title = { value }
    />
    <Condition when = "typeForExport" is = { [ value ] } >
      <RadioList list = { list } />
      { children }
    </Condition>
  </>
)
