import styled from "styled-components";
import { LinkButtonStyle } from "../../../../shared/components/buttonsAndLinks";

export const BorderForListItem = styled.div<{$check: boolean}>`
  
  ${ LinkButtonStyle }
  user-select: none;

  background-color: ${ ( {$check, theme }) => $check ? theme.themeColors.color.navLink: "transparent"   };

  &:hover {
    background-color: ${ props => props.theme.themeColors.color.hoverLink };
  }
`