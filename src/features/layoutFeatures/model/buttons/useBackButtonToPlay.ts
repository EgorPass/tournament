import { useNavigate } from "react-router-dom"
import { IPLayLayoutContext } from "../../../../types"
import { usePlayLayoutContextConsumer } from "../contextPlayLayoutProvider"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useSetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"

export const useBackButtonToPlay = () => {
  const { discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const { locationState } = useLocationHooks()
  const { setPlayerModalData } = useSetPlayerModalData()
  const navigate = useNavigate()

  const path = "/api/play/tournament"
  const state = discipline ? {
    from:{
      pathname: "tournament",
      id: discipline?.tournament_id
    }
  } : locationState

  const back = () => {
    navigate( path, { state } )
    setPlayerModalData( null )
  }

  return { back }
}