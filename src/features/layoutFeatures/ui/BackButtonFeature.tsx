import { LayoutButton } from "../../../shared/components/buttonsAndLinks"
import { useBackButton } from "../model/buttons/useBackButton"

export const BackButtonFeature = () => {
  const { back } = useBackButton()
  return (
    <LayoutButton
      $actionType = "back"
      $callback = { back }
      $disabled = { false }
    >
      Назад
    </LayoutButton>
  )
}