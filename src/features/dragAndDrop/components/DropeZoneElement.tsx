import styled from "styled-components";

export const DropZoneElement = styled.div.attrs(({
  draggable: false,
  "data-type": "drop-zone"
}))`
  width: 308px;
  min-height: 45px;
  /* height: auto; */
  /* height: 45px; */
  /* height: 100%; */
  padding: 0;
  margin: 0;
  position: relative;
  /* display: inherit; */
// `