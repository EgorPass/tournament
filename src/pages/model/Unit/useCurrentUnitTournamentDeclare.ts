import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList";
import { IDiscipline, ITournament, ITournamentUnitDiscipline, IUnitTournamentData, TUnitDisciplineData } from "../../../types";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useQueryOptionsForItem } from "../../../shared/hooks/state/useQueryOptions/useQueryOptionsForItem";
import { useCurrentUnitData } from "./useCurrentUnitData";

export const useCurrentUnitTournamentDeclare = ( ) => {
  const { unit, isSuccess: unitIsSuccess } = useCurrentUnitData()

  const queryOptions = useQueryOptionsForItem()

    const { data: tournamentUnitDisciplines } = useGetSuspenseStateList<ITournamentUnitDiscipline>( "tournament_unit_discipline", "current_unit_id", unit!.id )

    const { data: tournamentPlayrs } = useGetSuspenseStateList<ITournamentUnitDiscipline>( "tournament_player", "current_unit_id", unit!.id )

    const disciplineIdList = new Set( [ 
          ...tournamentUnitDisciplines.map( it => it.discipline_id), 
          ...tournamentPlayrs.map( it => it.discipline_id ) 
        ] )

    const disciplineQueryList = useSuspenseQueries({
      queries: Array.from( disciplineIdList ).map( it => ({
        ...queryOptions<IDiscipline>("discipline", "id", it)
      }))
    })
    const disciplineList = disciplineQueryList.map( it => it.data  )
    const tourIdList = new Set( disciplineList.filter( it => !!it).map( it => it!.tournament_id ) )

    const tournamentQueryList = useSuspenseQueries({
      queries: Array.from( tourIdList ).map( it => ({
        ...queryOptions<ITournament>("tournament", "id", it)
      }))
    })

    const tournamentList = tournamentQueryList.map( it => it.data )

    const { data, isSuccess: dataIsSuccess } = useSuspenseQuery( {
      queryKey: ["current_unit_reiting", { id: unit!.id}],
      queryFn: async( ) => {

        const disciplineData: TUnitDisciplineData = {
            prepare: [],
            play: [],
            gameOver: []
        }

        return disciplineList.reduce( ( acc, discipline ) => {
          if( discipline ){

            const { status, tournament_id  } = discipline!
            
            const isFind = acc[ status ].find( it => it.tournament.id === tournament_id )

            let unit_id = ""
            if( status !== "prepare" ){
              const unit = tournamentPlayrs.find( it => it.discipline_id === discipline.id )
              unit_id = unit ? unit.id : unit_id
            }
            else {
              unit_id = unit!.id
            }

            if( !isFind ) {
              const tournament = tournamentList.find( it => it!.id === tournament_id )
              if( tournament ) {
                acc[ status ].push( { tournament, discipline: [ { discipline, unit_id } ] } )
              }
            }
            
            if( isFind ) {
              isFind.discipline.push( { discipline, unit_id } )
            }
          }
          return acc 
        }, disciplineData as TUnitDisciplineData )

      }
    })

    const isSuccess = unitIsSuccess && dataIsSuccess 
  return { unit, data, isSuccess }
}