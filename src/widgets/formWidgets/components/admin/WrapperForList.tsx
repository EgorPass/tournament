import { FC, ReactNode } from "react";
import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { Condition } from "../../../../shared/components/inputFields/condition";
import { RubberBox } from "../../../listWidgets";

interface IWrapperForExportList {
  children: ReactNode
  when: string
  head: string
}

export const WrapperForList:FC<IWrapperForExportList> = ({children, when, head }) => (
  <Condition when = { when } is = { ['choose'] }>
    <GroupContentWrapper>
      <RubberBox
        title = { head }
        bd = { false }
        isOpened = { true }
      >
        { children }
      </RubberBox>
    </GroupContentWrapper>
  </Condition>
)