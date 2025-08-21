import styled from "styled-components"

export const StyledGridListContainer = styled.div.attrs(()=>({
  className: "styledGridListContainer"
}))`
  display: grid;
  justify-items: start;
  grid-row-gap: 8px;
  height: auto;

  padding-left: 10px;

  & .styledGridListContainer {
    padding-left: 10px
  }

  @media (${props => props.theme.media.max}) {
    padding-left: 0;
  }
`