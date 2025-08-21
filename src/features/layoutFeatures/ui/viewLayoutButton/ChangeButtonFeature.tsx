import { LayoutButton } from "../../../../shared/components/buttonsAndLinks"
import { useChangeButton } from "../../model/buttons/useChangeButton"

export const ChangeButtonFeature = () => {
  const { redirect, titleMod } = useChangeButton()
  return (
    <LayoutButton
      $actionType = "change"
      $callback = { redirect }
      $disabled = { false }
    >
      { titleMod }
    </LayoutButton>
  )
}