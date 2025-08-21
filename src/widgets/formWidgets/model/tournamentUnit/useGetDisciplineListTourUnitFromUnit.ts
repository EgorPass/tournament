import { useFormState } from "react-final-form"
import { useGetSuspenseStateStore } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"
import { IDiscipline, ITournament, ITournamentUnit, ITournamentUnitDiscipline, IUnit, TDisciplineList } from "../../../../types"
import { apiDate } from "../../../../shared/lib/api/apiDate"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useGetQueryData } from "../../../../shared/hooks/state/useGetQueryData"
import { useGetSuspenseStateList } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { apiUnit } from "../../../../shared/lib/api/apiUnit"
import { apiForCreateData } from "../../../../shared/lib/api/apiForCreateData"
import { useMemo } from "react"

export const useGetDisciplineListTourUnitFromUnit = () => {
  const getQueryData = useGetQueryData( )
  const { fromId, currentNodeId, createDatafromData  } = useLocationHooks()
  const { values } = useFormState()
  
  const tournament_unit_id = createDatafromData && ( fromId !== currentNodeId ) ? " " : currentNodeId
  const tournamentUnit = getQueryData<ITournamentUnit>("tournament_unit", "id", tournament_unit_id )

  const unit_id = tournamentUnit ? tournamentUnit.current_unit_id : fromId
  const unit = getQueryData<IUnit>( "current_unit", "id", unit_id )
 
  const tournament_id_forQuery = tournamentUnit ? tournamentUnit.tournament_id : " "
  const tournamentFromQuery = getQueryData<ITournament>("tournament", "id", tournament_id_forQuery )

  const  { data: tournaments } = useGetSuspenseStateStore<ITournament>("tournament")

  const tournament_id = !!tournamentFromQuery ? tournamentFromQuery.id : values && values.tournament_id ? values.tournament_id as string: " "
  const { data: disciplines } = useGetSuspenseStateList<IDiscipline>("discipline", "tournament_id", tournament_id )
  
  const tournament = tournaments.find( it => it.id === tournament_id )
  const age = apiDate.getAge(unit!.birthday, tournament?.date ) as string
  const emptyUnitDiscipline: Omit<ITournamentUnitDiscipline, "id" | "discipline_id"> = {
    tournament_id,
    tournament_unit_id: tournament_unit_id ? tournament_unit_id : '',
    current_unit_id: unit.id,
  } 
  
  let list = values.list as ITournamentUnitDiscipline[]
  const dep = createDatafromData && ( fromId !== currentNodeId ) ? [ tournament_id, fromId ] : [ currentNodeId, list ]

  const disciplineList: TDisciplineList = useMemo( 
    () => disciplines
    .filter( disc => !!apiUnit.getUnitCategory( disc, unit.gender, age, unit.weight ) )
    .reduce( (acc, disc ) => {
      const tourUnitDisc = list.find( it => it.discipline_id === disc.id )
      if( !!tourUnitDisc ) {
        acc.push( {
          title: disc.name, data: tourUnitDisc
        })
      } 
      else {
        const newtourUnitDisc = apiForCreateData.createTournamentUnitDiscipline({...emptyUnitDiscipline, discipline_id: disc.id })
        acc.push( {title: disc.name, data: newtourUnitDisc })
      }
      return acc 
    }
      , [ ] as TDisciplineList
    )
  
  , dep )
  return {
    disciplineList
  }
} 