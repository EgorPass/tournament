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
    text-shadow: 2px 2px 2px white;
    color: gray;
    background-color: #ffbaba15;
  }
  
  & ~ label.date-container__label {
    & input{ 
      background-color: #f4eded;
    }
  }
  & ~ div,   
  & ~ div + div  { // изменяет подписи радио кнопок и кнопки
    background-color: #ffbaba15;
    
  }
  & ~ div + div {
    color: gray;
    
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