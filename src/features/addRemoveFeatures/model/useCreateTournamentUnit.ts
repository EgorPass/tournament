import { useDBGetMethods, useDBSetMethods } from "../../../shared/store/offlineDB"
import { ITournamentUnit, IUnit } from "../../../types"
import { apiForCreateData } from "../../../shared/lib/api/apiForCreateData"
import { apiDate } from "../../../shared/lib/api/apiDate"

export const useCreateTournamentUnit = () => {
  
  const { getItemsFromDB, getItemFromDB } = useDBGetMethods()
  const { changeAtDB } = useDBSetMethods()

  return async(tournament_id: string, unit_id: string) => {
    let tournamentUnit: ITournamentUnit | undefined
    const tourUnitList = await getItemsFromDB<ITournamentUnit>("tournament_unit", "tournament_id", tournament_id )
              
    tournamentUnit = tourUnitList
        .find( it=> {
          const isCurrrentUnit = it.current_unit_id === unit_id
          const isCurrentTournament = it.tournament_id === tournament_id
          return isCurrentTournament && isCurrrentUnit
        } 
      ) 

    if( !tournamentUnit && !!tournament_id ) {
      const number = tourUnitList.length + 1 + ""
      const current_unit = await getItemFromDB<IUnit>( "current_unit", "id", unit_id )
      tournamentUnit = apiForCreateData.createTournamentUnit_({
        number, tournament_id, current_unit_id: unit_id,
        weight: (current_unit!.weight ?? "0"),
        age: apiDate.getAge(current_unit!.birthday, new Date() )
      })
      await changeAtDB("tournament_unit", tournamentUnit )
    }
    
    return tournamentUnit
  }
}