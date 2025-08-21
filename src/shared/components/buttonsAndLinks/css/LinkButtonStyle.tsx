import styled, { css } from "styled-components";

export const LinkButtonStyle = css`
  position: relative;
  padding: 10px 15px 10px;  
  border-radius: 5px;
  border: 1px solid rgba( 0, 0, 0, .03);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .03);

  text-decoration: none;
  color: #000;

  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  /* background-color: white; */

  &:hover{
    background-color: #f8f8e9;
  } 

  &:active {
    top: 2px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .08);

  }
`