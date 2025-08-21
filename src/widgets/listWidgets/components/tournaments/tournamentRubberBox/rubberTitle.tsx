import styled from "styled-components";

export const RubberTitle = styled.span`
  font-size: ${ (props) => props.theme.nav.font.sz.ph };
  font-weight: ${ (props) => props.theme.nav.font.wg.ph };
  color: ${
      (props) => props.theme.themeColors.font.nav };
  background-color: transparent;
`;
