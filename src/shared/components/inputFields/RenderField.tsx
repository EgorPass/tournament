import { Field, FieldRenderProps } from "react-final-form";
import { textFieldValidator } from "../../lib/form/textFieldValidator";
import { FC, ReactNode } from "react";

interface IRenderField {
  name: string,
  placeholder?: string,
  valid?: boolean,
  render: (props: FieldRenderProps<string, HTMLElement, string>) => ReactNode | undefined
}

export const RenderFiled: FC<IRenderField> = ( {
  name, render, valid = true, placeholder = "",  
} ) => (
  <Field
    name = { name }
    render = { render }
    placeholder = { placeholder }
    validate = { valid ? textFieldValidator : undefined }
  />    
)