import { FC, ReactNode } from "react";
import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { GroupContentHead } from "../../../../shared/components/heads";
import { Condition } from "../../../../shared/components/inputFields/condition";

interface IWrapperForExportList {
  children: ReactNode
  when: string
  head: string
}

export const WrapperForList:FC<IWrapperForExportList> = ({children, when, head }) => (
  <Condition when = { when } is = { ['choose'] }>
    <GroupContentWrapper>
      <GroupContentHead>{ head }</GroupContentHead>
      { children }
    </GroupContentWrapper>

  </Condition>
)