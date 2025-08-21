import styled from "styled-components";

export const DropZoneElement = styled.div.attrs(({
  draggable: false,
  "data-type": "drop-zone"
}))`
  width: 308px;
  height: 45px;
  padding: 0;
  margin: 0;
  position: relative;
`