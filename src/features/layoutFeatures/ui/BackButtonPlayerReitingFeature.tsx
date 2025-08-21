import { LayoutButton } from "../../../shared/components/buttonsAndLinks"
import { useSetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting"


export const BackButtonPlayerReitingFeature = () => {
  const { setPlayerModalReiting  } = useSetPlayerModalReiting()
  return (
    <LayoutButton
      $actionType = "back"
      $callback = { () => {
        setPlayerModalReiting( null )
      } }
      $disabled = { false }
    >
      Назад
    </LayoutButton>
  ) 
}