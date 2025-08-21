import styled from "styled-components";


export const ResultReitingWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  padding: 15px 20px;
`

export const ResultRetingColumns = styled.div<{$col?: number}>`
  display: grid;
  grid-template-columns: ${({$col}) => !$col ? "repeat(auto-fit, 350px)" : `repeat(${$col},  350px)` };
  grid-column-gap: 20px;
  /* padding: 15px 20px; */
  box-sizing: border-box ;
  /* max-width: 370px; */
  /* border-right: 1px dotted rgba(0, 0, 0, .15); */
  /* padding-right: 20px; */
  
 
`

export const GenderWrapper = styled.div`
  
  /* border: 1px dotted red; */
  margin-top: 8px;

  margin-bottom: 15px;
`
export const GenderGround = styled.div`
  padding: 0;
  margin: 0;
  /* border: 1px dotted black; */

`

export const CategoryWrapper = styled.div`
  
  /* border: 1px solid gray; */
  /* 
  border-top: none;
  border-right: none;
  border-left: none; */
  /* border-radius: 3px; */
  padding: 0px 0;
  margin-bottom: 8px;

`

export const CategoryItemGroup = styled.div<{$status: boolean}>`
  padding: 8px 8px;
  border: 1px solid rgba(0, 0, 0, .05);
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #f8f8f8;

  /* border: 1px solid black; */
  cursor: ${ ({$status}) => $status ? "pointer" : "inherit" };

`

export const PlayerGround = styled.div`
  border: 1px solid rgba(0, 0, 0, .05);
  /* border: 1px dotted red; */
  border-radius: 5px;
  padding: 5px 10px;

  max-width: auto;
  margin-bottom: 3px;
  user-select: none;

  &:last-child{
    margin-bottom: 0;
  }


`


export const Title = styled.div`
  

`