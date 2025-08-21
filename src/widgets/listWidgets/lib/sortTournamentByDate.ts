import { apiDate } from "../../../shared/lib/api/apiDate";
import { ITournament, TTreeDate } from "../../../types";

interface ISortObjByDate {
  actual: ITournament[],
  finished: ITournament[],
  fuckup: ITournament[]
}
export const sortTournamentByDate = (list: ITournament[]) => {
  try{

    const sortObj:ISortObjByDate = {actual: [], finished: [], fuckup: []};
    list.forEach( it => {
      const actual =  apiDate.dateCompare( it.date, Date.now() ) > 0
      
      if( it.status === "gameOver" ) sortObj["finished"].push( it ) 
      if( it.status !== "gameOver" && !actual ) sortObj["fuckup"].push( it )
      if( it.status !== "gameOver" && actual ) sortObj["actual"].push( it )
    })
        
    const sortList = Object.entries( sortObj )
    const translate : { [key: string]: string } = {
      actual: "Актуальные",
      finished: "Закончиные",
      fuckup: "Просроченные",
    }
        
    return  sortList.map( it => ( [ translate[ it[0] ], it[1]] as TTreeDate ) ) 
  
  }
  catch (err ) {
    console.log( err )
    if( err instanceof Error ) throw new Error( err.message )
    else throw new Error( "Oops")
  }    
}
