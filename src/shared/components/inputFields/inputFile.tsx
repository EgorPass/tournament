import { ChangeEventHandler, FC, ReactNode } from "react"
import styled from "styled-components"
import { LinkButtonStyle } from "../buttonsAndLinks"

const StyledInputFileLabel = styled.label`
  & > input {
    display: none;
  }
  & > div {
    /* ${ LinkButtonStyle } */
    width: 308px;
    /* text-decoration: underline; */
    font-weight: 500;
    cursor: pointer;
  }
`

export const InputFile: FC<{title: string | ReactNode, accept?: string, callback?: ChangeEventHandler<HTMLInputElement> | undefined}> = ({ title, accept = ".json", callback = undefined }) => (
  <StyledInputFileLabel>
    <input name = "files" type = "file" accept = { accept } onChange = { callback }/><div>{ title }</div>
  </StyledInputFileLabel>
)

export const ResetFile: FC<{title: string, callback: React.MouseEventHandler<HTMLDivElement> }> = ({ title, callback }) => (
  <StyledInputFileLabel>
    <div
      onClick = { callback }
    >{ title }</div>
  </StyledInputFileLabel>
)