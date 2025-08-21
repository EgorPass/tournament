import { ChangeEventHandler, FC, ReactNode } from "react"
import styled from "styled-components"

const StyledInputFileLabel = styled.label`
  & > input {
    display: none;
  }
  & > span {
    text-decoration: underline;
    font-style: italic;
    cursor: pointer;
  }
`

export const InputFile: FC<{title: string | ReactNode, accept?: string, callback?: ChangeEventHandler<HTMLInputElement> | undefined}> = ({ title, accept = ".json", callback = undefined }) => (
  <StyledInputFileLabel>
    <input name = "files" type = "file" accept = { accept } onChange = { callback }/><span>{ title }</span>
  </StyledInputFileLabel>
)