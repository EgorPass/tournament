import { ReactNode, FC } from "react";
import styled from "styled-components";

const StyledButtonBox = styled.section<{$type?: string}>`
  /* border: 1px dotted red; */
  display: grid;
  border-top: 1px solid rgba(0, 0, 0, .05);
  height: auto;
  margin: 10px 12px 0;
  align-items: center;

  grid-template-areas: ${({$type})=> {
    if( $type === "view-buttons-container" ) return `"back empty empty change"`
    if( $type === "add-buttons-container" ) return `"back empty"`
    if( $type === "create-buttons-container" ) return "'back empty reset  save'"
  }};
  grid-template-columns: ${ ({$type}) => {
    if( $type === "view-buttons-container" ) return "105px auto auto 105px"
    if( $type === "add-buttons-container" ) return "105px auto"
    if( $type === "create-buttons-container" ) return "105px auto auto 105px"
  }};

    @media (${props => props.theme.media.large}) {
      grid-template-columns: 105px auto 120px 105px;
    }
  

`

export const LayoutButtonBox:FC<{children: ReactNode, type: string }> = ({ children, type }) => (
  <StyledButtonBox 
    $type = { type }
  >
    { children }
  </StyledButtonBox>
)