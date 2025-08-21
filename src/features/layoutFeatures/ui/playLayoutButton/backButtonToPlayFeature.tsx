import { LayoutButton } from "../../../../shared/components/buttonsAndLinks"
import { useBackButtonToPlay } from "../../model/buttons/useBackButtonToPlay"


export const BackButtonToPlayFeature = () => {
  const { back } = useBackButtonToPlay()
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