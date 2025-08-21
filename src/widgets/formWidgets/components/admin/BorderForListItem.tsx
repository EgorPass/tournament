import styled from "styled-components";

export const BorderForListItem = styled.div<{$check: boolean}>`
  
  width: 308px;
  /* border: 1px solid gray; */
  padding: 10px 10px 10px 15px;
  margin-bottom: 10px;
  border-radius: 8px;


  background-color: ${ ( {$check}) => $check ? "#00800021": "transparent"   };

  &:hover {
    background-color: #aaaf7123;
  }
`