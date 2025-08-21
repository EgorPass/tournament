import styled from "styled-components";

export const GroupLinks = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, 308px);
  justify-content: center;
  grid-row-gap: 18px;
  grid-column-gap: 15px;
  overflow: hidden;
  /* overflow: hidden; */
  @media (${props => props.theme.media.max}) {
    justify-content: center;
  }
`