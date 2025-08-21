import { useDBSetMethods } from "../../../../shared/store/offlineDB"
import { IDiscipline, IExportDataItems, ILevel, ITournament, ITournamentUnit, ITournamentUnitDiscipline, IUnit } from "../../../../types"

export const useImportDataFormDisc = () => {
  const { changeAtDB } = useDBSetMethods()
  const importDataFormDisc = async( values: IExportDataItems ) => {
   
    const { importData: {
              discipline, 
              level, 
              current_unit, 
              tournament_unit, 
              tournament_unit_discipline
            } , 
            current_unit_list, 
            tournaments_list 
    } = values 
  
    const units: IUnit[] = []
    const level_list: ILevel[] = []
    const discipline_list: IDiscipline[] = []
    const tournament_unit_list: ITournamentUnit[] = []
    const tournament_unit_discipline_list: ITournamentUnitDiscipline[] = []
    // tournament_player
    // level_result
    // level_list


    for( let i = 0, len = tournaments_list.length; i < len; i++ ) {
      const tour_id = tournaments_list[ i ].id
      const disc_list = discipline
                        .filter( it => it.tournament_id === tour_id )

      const tour_unit_list = tournament_unit
                            .filter( it => it.tournament_id === tour_id )
      
      const tour_unit_disc_list = tournament_unit_discipline
                            .filter( it=> it.tournament_id === tour_id )
      
      discipline_list.push( ...disc_list )
      tournament_unit_list.push( ...tour_unit_list )
      tournament_unit_discipline_list.push( ...tour_unit_disc_list )
    }
    
    for( let i = 0, len = discipline_list.length; i < len; i++) {
      const disc_id = discipline_list[ i ].id
      const l_list = level
                      .filter( it => it.discipline_id === disc_id )
    
      level_list.push( ...l_list )
    }

    for( let i = 0, len = tournament_unit_list.length; i < len; i++) {
      const unit_id = tournament_unit_list[ i ].current_unit_id 

      const currentState = current_unit_list.find( it => it.id === unit_id )
      
      if( !!currentState ) continue

      const unit = current_unit.find( it => it.id === unit_id )
      if( unit ) units.push( unit )
    }
      
    await changeAtDB<ITournament>('tournament', tournaments_list)
    await changeAtDB<ILevel>('level', level_list )
    await changeAtDB<IDiscipline>("discipline", discipline_list )
    await changeAtDB<ITournamentUnit>("tournament_unit", tournament_unit_list )
    await changeAtDB<ITournamentUnitDiscipline>("tournament_unit_discipline", tournament_unit_discipline_list )
    await changeAtDB<IUnit>("current_unit", [ ...current_unit_list, ...units ] )    
  }

  return importDataFormDisc
}