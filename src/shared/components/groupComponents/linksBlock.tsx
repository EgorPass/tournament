import { FC, ReactNode } from "react"
import { GroupContentWrapper } from "./groupContentWrapper"
import { GroupLinks } from "./groupLinks"
import { LinkBlockHead } from "./LinkBlockHead"

export const LinksBlock: FC<{ head: string, children: ReactNode, groupClassName?:string }> = ({ head, children, groupClassName }) => (
  <GroupContentWrapper>
    { !!head && <LinkBlockHead>{ head }</LinkBlockHead> }
    <GroupLinks
      className = { groupClassName }
    >{ children }</GroupLinks>
  </GroupContentWrapper>
)