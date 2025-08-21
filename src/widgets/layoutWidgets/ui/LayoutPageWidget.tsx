import styled from "styled-components"

export const LayoutPageWidget = styled.main`
  /* border: 1px dotted gray; */
  height: 100%;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto 70px;
 
  input:focus,
  select:focus {
    outline: 1px dotted rgba( 105, 105, 105, .6);
  }
  
  * {
    line-height: 1.4;
  }

`