import { Field, } from "react-final-form"
import { FC, ReactNode } from "react"
import { StyleWrapperForTextBox } from "./styleWrapperForTextBox"
import { ValidationError } from "./validatorError"
import { textFieldValidator } from "../../lib/form/textFieldValidator"

export const SelectInput: FC<{name: string, children: ReactNode, value?: string, valid?: boolean }> = ({ name, children, value = "", valid = false }) => (
  <StyleWrapperForTextBox>
    <ValidationError name = { name } />
    
    <Field
      name = { name }
      component = "select"
      validate = { valid ? textFieldValidator : undefined }
      
      placeholder = "push me"
    >
      {children}
    </Field>
  </StyleWrapperForTextBox>
)