import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useGetSuspenseStateStore } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { apiDate } from "../../../shared/lib/api/apiDate"
import { apiUnit } from "../../../shared/lib/api/apiUnit"
import { IDiscipline, ITournament, ITournamentUnitDiscipline, IUnit } from "../../../types"

export const useAddUnitFilterPlayer = () => {
  const { fromId } = useLocationHooks()
  const { data: discipline } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", fromId  )
  const { data: tournament } = useGetSuspenseStateItem<ITournament>( "tournament", "id", discipline!.tournament_id )

  const { data: units } = useGetSuspenseStateStore<IUnit>( "current_unit" ) 
  const { data: tour_unit_disc_list, isSuccess: tourUnitIsSuccess } = useGetSuspenseStateList<ITournamentUnitDiscipline>("tournament_unit_discipline", "discipline_id", discipline!.id, "tournament_id", tournament!.id )

  const isSuccess = !!discipline && !!tournament && tourUnitIsSuccess

  let unitList: IUnit[] = []

  if( isSuccess ) {
    unitList = units
    .filter( unit => {
      const isPlayer = !!tour_unit_disc_list.find( tudl => tudl.current_unit_id === unit.id)
      
      if( isPlayer ) return false 
      else{
        const age = apiDate.getAge( unit.birthday, tournament!.date, )
        return !!apiUnit.getUnitCategory( discipline!, unit.gender, age, unit.weight )
      } 
    })
  }

  return  unitList 
}