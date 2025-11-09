import { FC, ReactNode } from "react";
import { RadioList } from "../generic/list/radioList";
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem";
import { Condition } from "../../../../shared/components/inputFields/condition";
import styled from "styled-components";

interface IChooseItemForExport {
  value: string,
  children?: ReactNode,
  list: Array<{[key: string]: string }>
}


const PaddingLeft = styled.div`
  margin-left: 30px;
`

const PaddingTop = styled.div`
  margin-top: 8px; 
`

export const ChooseItemForExport:FC<IChooseItemForExport> = ({value, children, list}) =>  (
  <>
    <Checkbox
      name = "typeForExport"
      value = { value }
      title = { value }
    />
    <Condition when = "typeForExport" is = { [ value ] } >
      <PaddingLeft>
        <RadioList list = { list } />
          <PaddingTop>{ children }</PaddingTop>
      </PaddingLeft>
    </Condition>
  </>
)
