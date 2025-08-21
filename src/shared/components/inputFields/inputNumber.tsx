import { FC } from "react"
import { StyleWrapperForTextBox } from "./styleWrapperForTextBox"
import { ValidationError } from "./validatorError"
import { RenderFiled } from "./RenderField"
import { excluderLetterChar } from "../../lib/form/excluderLetterChar"

interface IInputNumber {
  name: string,
  placeholder?: string,
  valid?: boolean,
  callback?: React.MouseEventHandler<HTMLInputElement>,
  length?: number
  max?: number
}

export const InputNumber: FC<IInputNumber> =({name, placeholder = "", valid = true, callback = ()=> {}, length, max = 10000000 }) => {
  return (
    <StyleWrapperForTextBox 
      // tabIndex = { 0 } 
    >
      <ValidationError name = { name } />
      <RenderFiled
        name = { name }
        valid = { valid }
        render = {
          ({input, meta}) => (
            <input
              { ...input }
              type = "text"
              maxLength = { length }
              placeholder = { placeholder }
              onClick = { callback }
              onKeyDown = { excluderLetterChar }
              // disabled = { true }
            />
          )
        }
      />    
    </StyleWrapperForTextBox>
  )
}