import { useNavigate } from "react-router-dom"
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { useGetStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateList"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ILevel, ITournament } from "../../../types"
import { useEffect } from "react"


export const useLevelData = () => {
  const { currentNodeId } = useLocationHooks()
  const navigate = useNavigate()

  const { data: level, isSuccess: levelIsSuccess } = useGetSuspenseStateItem<ILevel>( "level", "id", currentNodeId! )
  const { data: discipline, isSuccess: disciplineIsSucces } = useGetSuspenseStateItem<IDiscipline>( "discipline", "id", level!.discipline_id )
  const { isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>("tournament", "id", discipline!.tournament_id )
  
  useGetStateItem<ILevel>( "level", "id", level?.fromResult.level!, !!level && !!level.fromResult.level )
  
  useGetStateItem<IDiscipline>( "discipline", "id", level?.fromResult.discipline!, !!level && !!level.fromResult.discipline )
  
  useGetStateItem<ITournament>( "tournament", "id", level?.fromResult.tournament!, !!level && !!level.fromResult.tournament && !!level.fromResult.discipline )
  
  useGetStateList<ILevel>( "level", "discipline_id", level!.discipline_id, !!level && ( level.createLevel === "fromPastLevel") )
  
  const isSuccess = levelIsSuccess && disciplineIsSucces && tournamentIsSuccess 
  // && levelResultIsSuccess && fromDisciplineIsSuccess && fromTournamentIsSuccess && levelListIsSuccess

  useEffect(() => {
    if( discipline?.status === "play" ) {
      navigate("api/", {replace: true, state: null } )
    }
  }
    , [ discipline ]
  )

  return { level, isSuccess }
}