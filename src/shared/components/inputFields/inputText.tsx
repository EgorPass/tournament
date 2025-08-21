import { FC } from "react";
import { StyleWrapperForTextBox } from "./styleWrapperForTextBox";
import { ValidationError } from "./validatorError";
import { RenderFiled } from "./RenderField";

export const InputText:FC<{name: string, placeholder?: string, valid?: boolean }> = ({name, placeholder, valid = true}) => (
  <StyleWrapperForTextBox>
    <ValidationError name = { name } />
    <RenderFiled
      name = { name }
      valid = { valid }
      placeholder = { placeholder }
      render = {
        ({input, meta}) => (
          <input
            { ...input }
            type = "text"
            placeholder = { placeholder }
          />
        )
      }
    />
  </StyleWrapperForTextBox>
)
