import { apiCheck } from "../../../shared/lib/api/apiCheck"
import { apiDate } from "../../../shared/lib/api/apiDate"
import { ITournament, TGetTournamentListResponse } from "../../../types"

interface ITournamentSortData {
  [key: string] : {
    actual: ITournament[] 
    finished: ITournament[]
    fuckup: ITournament[]
  }
}
export const  sortTournamentListByFamily = ( list: ITournament[], sortType: string ) => {
  const sortObj: ITournamentSortData = {  }
  const result: TGetTournamentListResponse = []

  try{
    list
      .sort( (x, y) => apiDate.dateCompare( x.date, y.date))
      .forEach( it => {
        const field = it[ sortType as "family" | "organizer" ]
        const actual =  apiDate.dateCompare( it.date, Date.now() ) > 0
        
        if( !(field in sortObj) ) {
          sortObj[ field ] = { actual: [], finished: [], fuckup: [] }
        }
        
        if( it.status !== "gameOver" && actual )  sortObj[field].actual.push( it )
        if( it.status !== "gameOver" && !actual) sortObj[ field ].fuckup.push( it )
        if( it.status === "gameOver" ) sortObj[field].finished.push( it )
      }) 

    if( apiCheck.isNotEmpty( sortObj ) ) return Object.entries( sortObj )
    return result  
  }

  catch( err ) {
    if( err instanceof Error ) throw new Error( err.message )
    else throw new Error( "Oops")
  }
}