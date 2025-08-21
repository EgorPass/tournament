import { FC, MouseEvent } from "react"
import { RemoveRowItemButton } from "../../../shared/components/buttonsAndLinks"
import { StyledFormRowButtonContainer } from "../components/StyledFormRowButtonContainer"

interface IProp {
  displayContent?: boolean
  callback: (e: MouseEvent<HTMLDivElement> ) => void
  justify?: string
}

export const FieldArrayRemoveFeature: FC<IProp> = ({displayContent = true, justify, callback}) =>  (
  <StyledFormRowButtonContainer $just = { justify }>
    { displayContent && <RemoveRowItemButton handleClick = { callback } /> }
  </StyledFormRowButtonContainer>
)