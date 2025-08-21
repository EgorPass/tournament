import { useGetSearchFilter } from "./useGetSearchFilter";
import { apiDate } from "../../../shared/lib/api/apiDate";
import { ITournament } from "../../../types";

export const useFilterTournamentList = (tournaments: ITournament[]) => {
  const searchFilter = useGetSearchFilter().toLocaleLowerCase()
  return tournaments = tournaments.filter( it => {
    let string: string = ""
    const tour: { [key: string]: string | object } = it as unknown as { [key: string]: string | object }

    for( let pr in tour ) {
      if( pr === "id" || typeof tour[ pr ] !== "string") continue;
      else if( pr === "date") {
        const [ year, month, date ] = ( tour[pr] as string ).split("-")
        string += `${ date } ${ apiDate.mounths[ +month - 1 ]} ${year} `
      }
      else {
        string += `${ tour[pr] } `
      }
    }
    if( it.address ) {
      const address = Object.values( it.address ).join(" ")
      string += address 
    }
    
    if( string.toLocaleLowerCase().includes( searchFilter ) ) return true
    return false
  })
}