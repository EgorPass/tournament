import styled from "styled-components"

export const LayoutMainScreenWidget = styled.div`
  position: relative;
  margin: 0px auto;
  /* border: 1px solid red; */
  height: calc(100% - 2px);  
  overflow: hidden;
  
  @media (${props => props.theme.media.mid}) {
    max-width: 450px;
  }

  @media (${props => props.theme.media.large}) {
    width: auto;
    display: grid;
    grid-template-columns: 317px minmax(350px, calc(100% - 317px) );
    justify-content: center;
  }

  @media( ${props => props.theme.media.max} ) {
    max-width: 1340px;
  }
  
`