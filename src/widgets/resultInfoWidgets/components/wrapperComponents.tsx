import styled from "styled-components";

export const ResultReitingWrapper = styled.div`
  width: 100%;
  padding: 15px 15px;
  height: 100%;
  overflow: auto;
`

export const ResultRetingColumns = styled.div<{$col?: number, $isTwoCol: boolean}>`

  display: flex;
  flex-flow: column nowrap;
  justify-content: start; 
  align-items: center;

  @media (${props => props.theme.media.max}) {
    display: grid;
    grid-template-columns: ${({$col}) => !$col ? "repeat(auto-fit, 320px)" : `repeat(${$col},  350px)` };
    box-sizing: border-box ;
    align-items: flex-start;
    justify-content: ${ props => props.$isTwoCol ? "center": "start" };
  }
`

export const CategoryWrapper = styled.div`
  padding: 0px 0;
  margin-bottom: 15px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

`

export const CategoryItemGroup = styled.div<{$status: boolean, $isSingle: boolean }>`
  border: ${ props => `1px solid ${props.theme.themeColors.color.primalLine}`};
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${ props => props.theme.themeColors.color.button};
  padding: ${props => props.$isSingle ? "10px 16px" : "8px" };
  cursor: ${ ({$status}) => $status ? "pointer" : "inherit" };
  
  width: 320px;
  
  

  &:last-child{
    margin-bottom: 0px;
  }
`

export const PlayerGround = styled.div`
  /* border: 1px dotted red; */
  border: ${ props => `1px solid ${props.theme.themeColors.color.secondaryLine}`};

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
  text-align: center;
/*   
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center; */
`