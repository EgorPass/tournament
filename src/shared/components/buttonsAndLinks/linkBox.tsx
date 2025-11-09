import { FC } from "react";
import { ILinkBox, ILinkBoxStyled } from "../../../types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LinkButtonStyle } from "./css/LinkButtonStyle";

const StyledLinkBox = styled.a.attrs<ILinkBoxStyled>(({ $to, $state})=>({
  as: Link,
  to: $to,
  state: $state,
  draggable: false,
  // onDrag: ( e) => e.preventDefault()
}))`
  ${ LinkButtonStyle }
`

export const LinkBox: FC<ILinkBox> = ({ children, to, state }) => (
  <StyledLinkBox
    $to = { to }
    $state = { state }
  >
    { children }
  </StyledLinkBox>
)