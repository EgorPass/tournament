import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { IDiscipline, ITournamentUnit, ITournamentUnitData, ITournamentUnitDiscipline, IUnit } from "../../../types"
import { apiUnit } from "../../../shared/lib/api/apiUnit"
import { useGetSuspenseStateStore } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"

export const useGetDisciplineUnitList = ( discipline: IDiscipline ) => {
  const units: ITournamentUnitData[] = [ ]
  const { data: tourUnits, isSuccess: isTourUnitsIsScuccess } = useGetSuspenseStateList<ITournamentUnit>( "tournament_unit", "tournament_id", discipline.tournament_id )

  const { data: tour_unit_disc, isSuccess: tourDiscSuccess } =useGetSuspenseStateList<ITournamentUnitDiscipline>("tournament_unit_discipline", "discipline_id", discipline.id )
  
  const { data: current_units, isSuccess: isUnitSuccess } = useGetSuspenseStateStore<IUnit>("current_unit")

  const tourDiscList = tour_unit_disc.map( it => it.tournament_unit_id )
  const tournamentUnits = tourUnits.filter( it => tourDiscList.includes( it.id ) )
  const currentUnitIdList = tournamentUnits.map( it => it.current_unit_id)
  const currentUnits = current_units.filter( it => currentUnitIdList.includes( it.id ))

  if( isTourUnitsIsScuccess && isUnitSuccess ){
    tour_unit_disc.reduce( (acc, unit_disc) => {
      const unit = currentUnits.find( it => it.id === unit_disc.current_unit_id )
      const tournamentUnit = tournamentUnits.find( it => it.id === unit_disc.tournament_unit_id )
      if( unit && tournamentUnit ) {
        acc.push({
          unit,
          tournamentUnit,
          id: tournamentUnit.id,
          range: apiUnit.getUnitCategory( discipline!, unit.gender, tournamentUnit.age, tournamentUnit.weight )
        })
      }
      return acc
    }, units as ITournamentUnitData[])
    .sort( (x, y) => +x.tournamentUnit.number - +y.tournamentUnit.number)
  }
  const isSuccess = tourDiscSuccess && isUnitSuccess && isTourUnitsIsScuccess 
  return { discipline, units, isSuccess }
}