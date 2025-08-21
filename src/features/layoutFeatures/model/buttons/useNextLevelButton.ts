import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IPLayLayoutContext } from "../../../../types"
import { usePlayLayoutContextConsumer } from "../contextPlayLayoutProvider"
import { useNavigate } from "react-router-dom"
import { useDBSetMethods } from "../../../../shared/store/offlineDB"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"

export const useNextLevelButton = () => {

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { changeAtDB } = useDBSetMethods()
  const { locationState } = useLocationHooks()
  const { level, discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  

  async function mutate() {
    if( level ) {
      level.status = "gameOver"
      await changeAtDB( "level", level )
     return { level }
    }
  }

  return useMutation({
    mutationFn: mutate,
    async onSettled(data, error, variables, context) {
      if( error ) {
        console.log( error )
        if( level ) {
          level.status = "play"
          await changeAtDB( "level", level )
        }
      }
      await queryClient.invalidateQueries({
        queryKey: [ "level", { "discipline_id": discipline!.id } ]
      })
      await queryClient.invalidateQueries({
        queryKey: [ "discipline-get-game-data", { "id": discipline!.id }]
      })
      await queryClient.invalidateQueries({
        queryKey: [ "discipline-get-game-reiting", { "id": discipline!.id }]
      })
      if( !error && data ) {
        navigate( "/api/play/discipline/prepare_level", {
          state: locationState, replace: true,
        })
      }

    },
  })
}