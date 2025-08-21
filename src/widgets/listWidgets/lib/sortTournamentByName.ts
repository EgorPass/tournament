import { ITournament } from "../../../types"

export const sortTournamentListByName = ( list: ITournament[]) => {
  try {
    return (list.sort( (x, y) => {
      if( x.name > y.name) return 1
      else return -1
    }))
  }
  catch (err ) {
    console.log( err )
    if( err instanceof Error ) throw new Error( err.message )
    else throw new Error( "Oops")
  }
}