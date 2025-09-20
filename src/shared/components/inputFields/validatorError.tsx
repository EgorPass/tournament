import { ReactNode, FC } from "react"
import { Field } from "react-final-form"
import styled from "styled-components"

const StyledInputErrorValidator = styled.span`
  visibility: hidden;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  border: none;
  position: absolute;

  & ~ input,
  & ~ label,
  & ~ label.date-container__label,
  & ~ div.radio-container__radio-button {
    /* text-shadow: 2px 2px 2px white; */
    color:  ${(props) => ( props.theme.themeColors.fontColor.placeholder)};
    background-color:  ${(props) => ( props.theme.themeColors.color.errorField )};
  }
  
  & ~ label.date-container__label {
    & input{ 
      background-color: ${(props) => ( props.theme.themeColors.color.errorField )};
    }
  }
  & ~ div,   
  & ~ div + div  { // изменяет подписи радио кнопок и кнопки
    background-color:  ${(props) => ( props.theme.themeColors.color.errorField )};;
    
  }
  & ~ div + div {
    color:  ${(props) => ( props.theme.themeColors.fontColor.placeholder)};
    
  }
`

const InputErrorValid: FC<{children?: ReactNode}> = ( { children } ) => (
  <StyledInputErrorValidator className = "tournament-form__error-validation">{ children }</StyledInputErrorValidator>
)

export const ValidationError: FC<{name: string}> = ({name}) => {
  return (
    <Field 
      name = { name }
      render = {
        ({meta}) => (
          <>
            { 
              meta.error && meta.touched && (
                <InputErrorValid>{ meta.error }</InputErrorValid> 
              )
            }
          </>
        )
      }
    />
  )
}