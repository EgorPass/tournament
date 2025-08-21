import { FC,  } from "react"
import { RadioboxMenuItem } from "./radioboxMenuItem"
import { INavRadioMenuItem } from "../../../types"
import { StyledListItem } from "./styledListItem"

export const NavRadioMenuItem: FC<INavRadioMenuItem> = (props) => (
  <StyledListItem>
    <RadioboxMenuItem {...props} />
  </StyledListItem>
)

