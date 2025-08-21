import { IDiscipline, ITournament } from "../../../../types"
import { useGetSuspenseStateStore } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"
import { useGetStateList } from "../../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateList"
import { useGetLevelProps } from "./useGetLevelProps"

export const useGetDisciplineResult = ( ) => {
  const { discipline_id, values } = useGetLevelProps()
  
  const { fromResult: { tournament: fromTourId } } = values
  
  const { data: tournaments } = useGetSuspenseStateStore<ITournament>("tournament")
  
  const { data: disciplines }= useGetStateList<IDiscipline>( "discipline", "tournament_id", fromTourId, !!fromTourId )
  
  return { tournaments, disciplines: disciplines?.filter( it => it.id !== discipline_id ) }
} 