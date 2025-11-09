import styled from "styled-components";

export const DraggableElement = styled.div.attrs(({
  draggable: true,
  "data-type": "drag-elem"
}))`
  width: 308px;
  /* height: auto; */
  /* height: 45px; */
  /* height: 100%; */
  padding: 0;
  margin: 0;
  z-index: 3;
  position: relative;

  &.drag {
    position: fixed;
    z-index: 2;
  }
`