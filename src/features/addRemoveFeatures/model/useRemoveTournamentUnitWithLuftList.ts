import { useDBGetMethods, useDBSetMethods } from "../../../shared/store/offlineDB"
import { ITournamentUnit } from "../../../types"

export const useRemoveTournamentUnitWithLuftList = () => {

  const { getItemsFromDB } = useDBGetMethods()
  const { removeFromDB, changeAtDB } = useDBSetMethods()

  return async (tournament_unit_id: string, tournament_id: string) => {
    const tourUnitList = await getItemsFromDB<ITournamentUnit>("tournament_unit", "tournament_id", tournament_id )

    tourUnitList.sort( ( x, y ) => +x.number - +y.number )
    const index = tourUnitList.findIndex( it => it.id === tournament_unit_id )

    if( index !== -1 ) {
      const removeTourUnit = tourUnitList.splice( index, 1 )
      const deltourunit = await removeFromDB("tournament_unit", removeTourUnit )
      // console.log( deltourunit )
      
      for( let i = index; i < tourUnitList.length; i++ ) {
        tourUnitList[ i ].number = +tourUnitList[i].number - 1 + ""
      }
    } 
    await changeAtDB( "tournament_unit", tourUnitList )
    

  }
}