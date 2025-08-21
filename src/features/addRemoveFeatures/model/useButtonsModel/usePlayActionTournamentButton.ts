import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetSuspenseStateList } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useGetSuspenseStateItem } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import {  IDiscipline, ITournament, TPlayStatus } from "../../../../types"
import { statusTranslate } from "../../lib/statusTranslate"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useDBSetMethods } from "../../../../shared/store/offlineDB"
import { useCreateTournamentPlayer } from "../useCreateTournamentPlayer"
import { useNavigate } from "react-router-dom"


export const usePlayActionTournamentButton = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { currentNodeId, locationState } = useLocationHooks()
  const { changeAtDB } = useDBSetMethods()

  const createTournamentPlayer = useCreateTournamentPlayer( currentNodeId )

  // const { data: tournament } = useGetSuspenseStateItem<ITournament>( "tournament", "id", currentNodeId )
  // const { data: discipline } = useGetSuspenseStateList<IDiscipline>("discipline", "tournament_id", currentNodeId )

  const tournament = queryClient.getQueryData<ITournament>(["tournament", {"id": currentNodeId }] )
  const discipline = queryClient.getQueryData<IDiscipline[]>(["discipline", {"tournament_id": currentNodeId }])

  const mutate = useMutation({
    mutationFn: async () => {
      if( !tournament || !discipline ) return 
      if( tournament && tournament.status === "prepare") {
        createTournamentPlayer()
        for( let i = 0, len = discipline.length; i < len; i++ ) {
          await changeAtDB<IDiscipline>(
            "discipline", 
            { ...discipline[i], status: "play" }
          )
        }
        await changeAtDB<ITournament>("tournament", {...tournament, status: "play" } )
      }

      let status: TPlayStatus = "play"

      if( tournament && tournament.status === "play" ) {
        status = "paused"
      }
      if( tournament && tournament.status === "paused" ) {
        status = "play"
      }
      
      await changeAtDB<ITournament>("tournament", {...tournament, status } )
      
      await queryClient.invalidateQueries()
    },
    onSettled: async(data, error, variables, context) => {
      if( error ) {
        console.log( error.message )
      }
      console.log( "мы сделали это ......")

      navigate( "/api/view/tournament/check", {
        state: locationState,
      })
    },
  })

  return { 
    mutate,
    status: tournament!.status !== "gameOver",
    title: statusTranslate[ tournament!.status ],
  }
}