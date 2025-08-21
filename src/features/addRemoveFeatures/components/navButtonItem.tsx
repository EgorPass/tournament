import { FC, MouseEventHandler } from "react"
import { StyledListItem } from "../../../shared/components/navComponents/styledListItem"
import { StyledTitleGridBox } from "../../../shared/components/navComponents/styledTitleGridBox"

export const NavButtonItem: FC<{title: string, onclick: MouseEventHandler<HTMLDivElement> }> = ({ title, onclick }) => {
  return (
    <StyledListItem>
      <StyledTitleGridBox onClick = { onclick } >
        { title }
      </StyledTitleGridBox>
    </StyledListItem>
  )
}