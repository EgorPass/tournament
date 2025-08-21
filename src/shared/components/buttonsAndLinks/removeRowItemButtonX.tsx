import { FC, MouseEventHandler } from "react"
import styled from "styled-components"
import { CloseX } from "../../assets/closeX"

export const StyledRemoveItemButton = styled.div`
  border-radius: 50%;
  border: 1px solid rgba( 0, 0, 0, .26);
  
  display: flex;
  align-items: center;
  justify-content: center; 
  
  width: 20px;
  height: 20px;

  & svg {
    width: 14px;
    height: 14px;
  }

  box-shadow: 0px 2px 4px rgba(0, 0, 0, .4);

  background-color: #faf9f9;
  cursor: pointer;
  position: relative;

  &:hover{
    background-color: #f0f0f0;
  }

  &:active{
    top: 1px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, .4);
  }
  /* align-self: center; */
`

export const RemoveRowItemButton: FC<{handleClick?: MouseEventHandler}> = ({handleClick} ) => (
  <StyledRemoveItemButton onClick = { handleClick }>
    <CloseX />
  </StyledRemoveItemButton>
)