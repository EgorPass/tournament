import { FC } from "react";
import { CustomLink } from "./customLink";
import { StyledListItem } from "../../../shared/components/navComponents/styledListItem";


export const NavLink: FC<{to: string, title: string, state?: any}> = ({to, title, state }) => (
  <StyledListItem><CustomLink to = { to } title = { title } state = { state }/></StyledListItem>
)