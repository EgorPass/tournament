import styled from "styled-components";

export const StyledGridAreaItem = styled.div<{$gridArea: string}>`
  grid-area: ${ (props) => props.$gridArea };
`