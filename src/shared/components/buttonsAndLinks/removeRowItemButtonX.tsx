import { FC, MouseEventHandler } from "react"
import styled from "styled-components"
import { CloseX } from "../../assets/closeX"

export const StyledRemoveItemButton = styled.div`
  border-radius: 50%;
  border: ${ (props => `1px solid ${props.theme.themeColors.color.primalLine }`)};
  display: flex;
  align-items: center;
  justify-content: center; 
  
  width: 20px;
  height: 20px;

  & svg {
    width: 14px;
    height: 14px;
  }
  box-shadow: ${ (props => `0px 2px 4px ${props.theme.themeColors.color.primalLine }`)};

  background-color: ${ props => props.theme.themeColors.color.primalBg };
  cursor: pointer;
  position: relative;

  &:hover{
    background-color: ${ props => props.theme.themeColors.color.hoverLink };
  }
  color: ${ (props => props.theme.themeColors.fontColor.primal ) };

  &:active{
    top: 2px;
    box-shadow: ${ (props => `0px 0px 2px ${props.theme.themeColors.color.primalLine }`)};
  }
  /* align-self: center; */
`

export const RemoveRowItemButton: FC<{handleClick?: MouseEventHandler}> = ({handleClick} ) => (
  <StyledRemoveItemButton onClick = { handleClick }>
    <CloseX />
  </StyledRemoveItemButton>
)