import { LayoutButton } from "../../../../shared/components/buttonsAndLinks"
import { IModalPlayerLayoutConsummer } from "../../../../types"
import { useResetButton } from "../../model/buttons/useResetButton"
import { useModalPlayLayoutContextConsumer } from "../../model/contextPlayLayoutProvider"


export const ResetPlayButtonFeature = () => {
  const { reset, disabled } = useResetButton()
  const {  setResetState } = useModalPlayLayoutContextConsumer() as IModalPlayerLayoutConsummer

  const handleReset = () => {
    setResetState( {} )
    reset()
  }

  return (
     <LayoutButton
      $actionType = "reset"
      $callback = { handleReset }
      $disabled = { disabled }
    >
      Сбросить
    </LayoutButton>

  )
}