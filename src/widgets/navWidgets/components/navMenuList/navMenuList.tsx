import { FC, ReactNode } from "react";
import { NavRubberBox } from "./navRubberBox";
import { StyledInnerListContainer } from "./styledInnerListContainer";
import { StyledListItem } from "../../../../shared/components/navComponents/styledListItem";

export const NavMenuList: FC<{children: ReactNode, title: string }> = ({ children, title }) => (
  <StyledListItem>
    <NavRubberBox title = { title } >
      <StyledInnerListContainer>
        { children }
      </StyledInnerListContainer>
    </NavRubberBox>
  </StyledListItem>
)