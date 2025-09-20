import { css } from "styled-components";

export const LinkButtonStyle = css`
  position: relative;
  padding: 10px 15px 10px;  
  border-radius: 5px;

  border: ${ (props => `1px solid ${props.theme.themeColors.color.secondaryLine }`) };
  box-shadow: ${(props => `0 4px 4px 0 ${props.theme.themeColors.color.secondaryLine }`)};

  text-decoration: none;
  color: ${ (props => props.theme.themeColors.fontColor.primal ) };

  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
    background-color: ${ (props => props.theme.themeColors.color.mainBg ) };

  &:hover{
    background-color: ${ (props => props.theme.themeColors.color.hoverLink ) };
  } 

  &:active {
    top: 2px;
    box-shadow: ${(props => `0 2px 2px 0 ${props.theme.themeColors.color.secondaryLine }`)};

  }
`