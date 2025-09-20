import { useSuspenseQueries } from "@tanstack/react-query"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { IDiscipline, ITournamentUnit, ITournamentUnitData, ITournamentUnitDiscipline, IUnit } from "../../../types"
import { useQueryOptionsForItem } from "../../../shared/hooks/state/useQueryOptions/useQueryOptionsForItem"
import { apiUnit } from "../../../shared/lib/api/apiUnit"


export const useGetDisciplineUnitList = ( discipline: IDiscipline ) => {
  const queryOptions = useQueryOptionsForItem()
  const units: ITournamentUnitData[] = [ ]

  const { data: tour_unit_disc, isSuccess: tourDiscSuccess } =useGetSuspenseStateList<ITournamentUnitDiscipline>("tournament_unit_discipline", "discipline_id", discipline.id )

  const tournamentUnitsQueries = useSuspenseQueries({
    queries: tour_unit_disc.map( it => ({
      ...queryOptions<ITournamentUnit>("tournament_unit", "id", it.tournament_unit_id )
    }))
  })
  const currentUnitQueries = useSuspenseQueries({
    queries: tour_unit_disc.map( it => ({
      ...queryOptions<IUnit>("current_unit", "id", it.current_unit_id )
    }))
  })

  const tourUnitIsSuccess = tournamentUnitsQueries.map( it => it.isSuccess ).every( it => it === true )
  const currentUnitIsSuccess = currentUnitQueries.map( it => it.isSuccess ).every( it => it === true )

  if( tourUnitIsSuccess && currentUnitIsSuccess ){
    const currentUnits = currentUnitQueries.filter( it => it.data && it.data).map( it => it.data ) as IUnit[]
      
      const tournamentUnits = tournamentUnitsQueries.filter( it => it.data && it.data).map( it => it.data ) as ITournamentUnit[]
      
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
      }
      , units as ITournamentUnitData[]
    )
    .sort( (x, y) => +x.tournamentUnit.number - +y.tournamentUnit.number)

  }

  const isSuccess = tourDiscSuccess && currentUnitIsSuccess && tourUnitIsSuccess 

  return { discipline, units, isSuccess }

}