import {  useEffect, useLayoutEffect, useState } from "react"
import { ITournamentUnitData } from "../../../types"
import { useDBSetMethods } from "../../../shared/store/offlineDB"
import { getOverElem } from "../lib/getOverElem"

export const useTournamentUnitDrag = ( units: ITournamentUnitData[] ) => {
  const { changeAtDB } = useDBSetMethods()
  const [ list, setList ] = useState<ITournamentUnitData[]>([])
  
  useEffect( () => {
    setList (
      units.sort( ( x, y ) => {
        return +x.tournamentUnit.number - +y.tournamentUnit.number
      })
    )
  }
    , [ units, units.length ]
  )
  
  const sortAndDragTournamentUnit = <T>(elem: T) => ( dropZone: Element ) => {
    if( 
      !elem 
      || 
        ( 
          typeof elem !== "object" 
          || !("tournamentUnit" in elem ) 
          || !( "id" in elem ) 
        )
    ) return false

    const { tournamentUnit: { number }, id } = elem as unknown as  ITournamentUnitData
      if( !number || !id ) return false 
    
      const overElem = getOverElem( list, dropZone.id )
      if( !overElem ) return false

    const overNumber = overElem.tournamentUnit.number
    
    setList ( list => list.map( it => {
      if( it.id === id ) it.tournamentUnit.number = overNumber
      if( it.id === dropZone.id ) it.tournamentUnit.number = number
      return it
    })
    .sort( (x, y) => +x.tournamentUnit.number - +y.tournamentUnit.number ) )
    
    return true
  }
  
  const saveTournamentList = async ( ) => {

    for(let i = 0, len = list.length; i < len; i++){
      list[i].tournamentUnit.number = i + 1 + ""
      await changeAtDB("tournament_unit", list[i].tournamentUnit )
    }
    setList( list )
  }

  return {
    saveTournamentList, sortAndDragTournamentUnit, list,
  }
}