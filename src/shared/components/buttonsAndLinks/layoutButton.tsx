import { MouseEvent } from "react"
import styled from "styled-components"

interface ILayoutButton {
  $actionType: string, 
  $disabled?: boolean,
  $callback: (e: MouseEvent<HTMLButtonElement>) => void, 
}

export const LayoutButton = styled.button.attrs<ILayoutButton>( (props) => ({
  onClick: props.$callback,
  disabled: !!props.$disabled
}))`
  grid-area: ${ (props) => props.$actionType };
  user-select: none;
  background-color: #f6f6f6;
  width: 105px;
  height: 40px;
  border: 1px solid rgba( 0, 0, 0, .08);
  border-radius: 3px;
  box-shadow: 0 4px 4px  rgba(0, 0, 0, .2);

  cursor: pointer;

  position: relative; //${ props => props.$disabled ? "static" : "relative"};

  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #f3f3ed;
  }

  &:active {
    top: 2px;
    left: 0px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
  }
`