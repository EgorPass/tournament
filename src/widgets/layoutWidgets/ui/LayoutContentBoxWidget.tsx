import { Outlet } from "react-router-dom"
import styled from "styled-components"

const StyledLayoutContentBox = styled.section.attrs((props) => ({
  className: "tournament-tech__content-container"
}))`
  overflow: hidden;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto;
  grid-auto-rows: auto;
  align-content: start;
  /* border: 1px dotted blue; */
  
  padding: 0 6px 0 12px;

  position: relative;

  @media (${props => props.theme.media.large}) {
    /* padding-left: 12px;  
    padding-right: 12px ; */
  }
`

export const LayoutContentBoxWidget = () => {
  return (
    <StyledLayoutContentBox>
      <Outlet />
    </StyledLayoutContentBox>
  )
}