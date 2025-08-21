import { useDBGetMethods } from "../../../../shared/store/offlineDB"
import { IDiscipline, IExportDataItems, ILevel, ITournamentUnit, ITournamentUnitDiscipline, IUnit } from "../../../../types"

export const useExportDataToDisc = () => {
  const { getItemFromDB, getItemsFromDB } = useDBGetMethods()
  const exportDataToDisc = async( values: IExportDataItems ) => {
    const { 
      current_unit_list, tournaments_list, 
      tournamentUnits, fileName
    } = values

    const level: ILevel[] = []
    const discipline: IDiscipline[] = []
    // tournament_player
    // level_result
    // level_list

    const current_unit: IUnit[] = []
    const tournament_unit: ITournamentUnit[] = []
    const tournament_unit_discipline: ITournamentUnitDiscipline[] = []
          
    for(let i = 0, len = tournaments_list.length; i < len; i++) {
      const tour_id = tournaments_list[i].id
      const disc = await getItemsFromDB<IDiscipline>("discipline", "tournament_id", tour_id )
      discipline.push( ...disc )
      
      if( tournamentUnits.length > 0 ) {
        const tour_units = await getItemsFromDB<ITournamentUnit>("tournament_unit", "tournament_id", tour_id )
          
        const tour_units_disc = await getItemsFromDB<ITournamentUnitDiscipline>("tournament_unit_discipline", "tournament_id", tour_id)
        
        tournament_unit.push(...tour_units)
        tournament_unit_discipline.push( ...tour_units_disc )
      }
    }
    
    for( let i = 0, len = discipline.length; i < len; i++ ) {
      const disc_id = discipline[ i ].id
      const levelArr = await getItemsFromDB<ILevel>("level", "discipline_id", disc_id )
      level.push( ...levelArr )
    }
    
    for(let i = 0, len = tournament_unit.length; i < len; i++) {
      
      const unit_id = tournament_unit[i].current_unit_id
      
      const unit = await getItemFromDB<IUnit>("current_unit","id", unit_id)
      
      if( unit ) {

        const listState = current_unit_list.find( it => it.id === unit!.id )
        
        const currentState = current_unit.find( it => it.id === unit!.id )
        
        if( !!listState || !!currentState ) continue;
        
        current_unit.push( unit! )
      }
    }
    
    const saveData = {
      tournament: tournaments_list,
      discipline,
      level,
      
      current_unit: [...current_unit, ...current_unit_list ] ,
      tournament_unit,
      tournament_unit_discipline,
    }
    
    console.log( saveData )

    const blob = new Blob( [JSON.stringify( saveData ) ], { type: "application/json " } )
    const link = document.createElement( 'a' )
          link.href = URL.createObjectURL( blob )
          link.download = `${ fileName }.json`
          link.click()
          URL.revokeObjectURL( link.href )
   
    
  }

  return exportDataToDisc
}