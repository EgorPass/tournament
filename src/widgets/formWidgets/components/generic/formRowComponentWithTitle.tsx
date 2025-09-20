import { FC, ReactNode } from "react";
import styled from "styled-components";

const FormRowHead = styled.h6`
  color: #1d1d1d;
  font-weight: 400;
  padding: 0px;
  margin: 0 0 0 10px;
  text-align: start;
  justify-self: start;
  color: ${ props => props.theme.themeColors.fontColor.primal };
  
  @media (${props => props.theme.media.max}) {
    margin-left: 0;
    margin-top: 5px;
    align-self: start;
  }
`
const StyledFormRowContainer = styled.div`
  max-width: 600px;
  margin: 0px auto;
  padding: 10px 0px 10px 0;

  /* border-bottom: 1px solid rgba( 105, 105, 105, .1); */
    border-bottom: ${ (props) => `1px solid ${props.theme.themeColors.color.secondaryLine }` };


  display: grid;

  grid-template-rows: 35px auto;
  grid-template-columns: auto;
  align-items: center;
  
  &:first-child {
    padding-top: 0;
  }

  &:last-child{
    padding-bottom: 0;
    border: none;
  }

  @media (${props => props.theme.media.max}) {
    max-width: 100%;
    margin-left: 0;
    padding: 10px 10px 10px 10px;

    grid-template-rows: auto;
    grid-template-columns: 220px auto;
    /* justify-content: stretch; */
    align-items: center;
  }

`


export const FormRowComponentWithTitle: FC<{children: ReactNode, title: string}> = ({children, title}) => (
  <StyledFormRowContainer>
    <FormRowHead>{ title }</FormRowHead>
    { children }
  </StyledFormRowContainer>
)