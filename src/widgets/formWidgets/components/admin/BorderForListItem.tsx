import styled from "styled-components";

export const BorderForListItem = styled.div<{$check: boolean}>`
  
  width: 308px;
  /* border: 1px solid gray; */
  padding: 10px 10px 10px 15px;
  margin-bottom: 10px;
  border-radius: 8px;


  background-color: ${ ( {$check, theme }) => $check ? theme.themeColors.color.navLink: "transparent"   };

  &:hover {
    background-color: ${ props => props.theme.themeColors.color.hoverLink };
  }
`