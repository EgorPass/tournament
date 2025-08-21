import { MouseEvent } from "react"
import { LayoutButton } from "../../../../shared/components/buttonsAndLinks"
import { useSetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"


export const ClosePlayerModalData = () => {

  const { setPlayerModalData } = useSetPlayerModalData()

  return (
    <LayoutButton
      $actionType = "back"
      $callback = { ( e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setPlayerModalData( null )
      } }
      $disabled = { false }
    >
      Назад
    </LayoutButton>

  )
}