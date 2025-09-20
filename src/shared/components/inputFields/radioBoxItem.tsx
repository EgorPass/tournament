import { FC } from "react";
import styled from "styled-components";
import { ValidationError } from "./validatorError";
import { ValueField } from "./ValueField";

const RadioLabel = styled.label`
  cursor: pointer;
  margin: 0;
  padding: 0;
  & input[ type = "radio"] { display: none; }
  & > input + div > div > div{
    display: none;
  }
  & > input:checked + div > div > div{
    display: block;
  }
`
const RadoiContainer = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
  grid-template-areas: "radio-button radio-title";
  /* grid-template-rows: 25px; */
  justify-content: flex-start;
  align-items: center;
`
const RadioTitle = styled.div<{$gridArea: string}>`
  padding: 0;
  margin: 0;
  color: ${ props => props.theme.themeColors.fontColor.primal };
  
`

const StyledRadioButton = styled.div<{$gridArea: string}>`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => ( props.theme.themeColors.color.inputField)};
  box-shadow:  ${ (props => `inset 0 4px 4px 0 ${props.theme.themeColors.color.secondaryLine }`)};
  border: ${ (props => `1px solid ${props.theme.themeColors.color.primalLine }`)};


  & > div {
    width: 8px;
    height: 8px;
    padding: 0;
    margin: 0;
    line-height: 0;
    border-radius: 50%;
    background: ${(props) => ( props.theme.themeColors.color.marker )};
  }
`

const RadioButton = () => (
  <StyledRadioButton $gridArea="radio-button"><div></div></StyledRadioButton>
)

interface IProp {
  name: string, 
  value: string, 
  title: string, 
  valid?: boolean
}

export const RadioItem: FC<IProp> = ({title, name, value, valid = true }) => (
  <RadioLabel>
    <ValueField 
      name = { name }
      value = { value }
      type = "radio"
      valid = { valid }
    />
    {/* <Field 
      name = { name }
      value = { value }
      type = "radio"
      component = "input"
      validate = { valid ? textFieldValidator : undefined }
    /> */}
    <RadoiContainer>
      <ValidationError name = { name } />
      <RadioButton />
      <RadioTitle $gridArea = "radio-title">
        { title }
      </RadioTitle>
    </RadoiContainer>
  </RadioLabel>
)
