import { useNavigate } from "react-router-dom"
import { useSetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"

export const useBackButton = () => {
  const { setPlayerModalData } = useSetPlayerModalData()
  const navigate = useNavigate()
  const back = async () => {
    navigate( -1 )
    setPlayerModalData( null )
  }

  return { back }
}