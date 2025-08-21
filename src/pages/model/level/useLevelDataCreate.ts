import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ILevel, ITournament } from "../../../types"

export const useLevelDataCreate = () => {

  const {  fromId, currentNodeId } = useLocationHooks()
  const { data: level } = useGetStateItem<ILevel>( 'level', "id" , currentNodeId, currentNodeId === fromId )
  const discipline_id = ( currentNodeId !== fromId ) ? fromId: !!level? level.discipline_id: ""  
  const { data: discipline, isSuccess: disciplineIsSuccess } = useGetStateItem<IDiscipline>( "discipline", "id", discipline_id, !!discipline_id )
  const { isSuccess: tournamentIsSuccess } = useGetStateItem<ITournament>("tournament", "id", discipline?.tournament_id!, !!discipline)
  const isSuccess = disciplineIsSuccess && tournamentIsSuccess
  return { isSuccess }
}