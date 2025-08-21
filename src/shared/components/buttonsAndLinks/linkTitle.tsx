import { FC } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ILinkBox, ILinkBoxStyled } from "../../../types"


const StyledLinkTitle = styled.a.attrs<ILinkBoxStyled>(({ $to, $state})=>({
  as: Link,
  to: $to,
  state: $state
}))`
  color: #000;
`

export const LinkTitle: FC<ILinkBox> = ({ children, to, state }) => (
  <StyledLinkTitle
    $to = { to }
    $state = { state }
  >
    { children }
  </StyledLinkTitle>
)