import { LayoutButton } from "../../../../shared/components/buttonsAndLinks"
import { useResetButton } from "../../model/buttons/useResetButton"

export const ResetButtonFeature = () => {
  const { reset, disabled } = useResetButton()
  return (
    <LayoutButton
      $actionType = "reset"
      $callback = { reset }
      $disabled = { disabled }
    >
      Сбросить
    </LayoutButton>
  )
}