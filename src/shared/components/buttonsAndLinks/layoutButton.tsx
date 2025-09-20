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
  width: 105px;
  height: 40px;
  border-radius: 3px;
  background-color: ${ (props => props.theme.themeColors.color.button ) };
  border: ${ (props => `1px solid ${props.theme.themeColors.color.primalLine }`) };;
  box-shadow: ${(props => `0 4px 4px 0 ${props.theme.themeColors.color.primalLine }`)};

  cursor: pointer;
  color: ${ (props => props.theme.themeColors.fontColor.primal ) };

  position: relative; //${ props => props.$disabled ? "static" : "relative"};

  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: ${ (props => props.theme.themeColors.color.hoverLink ) };
  }

  &:active {
    top: 2px;
    left: 0px;
    box-shadow: ${(props => `0 2px 4px 0 ${props.theme.themeColors.color.primalLine }`)};
  }
`