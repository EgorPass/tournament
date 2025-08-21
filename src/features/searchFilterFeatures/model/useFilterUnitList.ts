// import { useGetSearchFilter } from "../../../features/searchFilter";
import { useGetSearchFilter } from "./useGetSearchFilter";
import { apiDate } from "../../../shared/lib/api/apiDate";
import { IUnit } from "../../../types";

export const useFilterUnitList = (units: IUnit[]) => {
  const searchFilter = useGetSearchFilter().toLocaleLowerCase();
  const today = new Date().getFullYear()
  return units.filter( it => {
    let string: string = ''
    const unit: { [key: string]: string }  = it as unknown as  { [key: string]: string } 
    
    for( let pr in unit ) {
      if( pr === "id" ) continue;
      if( pr === "gender" ) {
        string += `${ unit[pr] === "boy" ? "мужской" : "женский" } `
      }
      else if( pr === "birthday") {
        const [ year, month, date ] = unit[pr].split("-")
        string += `${ date } ${ apiDate.mounths[ +month - 1 ]} ${year} ${ +today - +year } `
      }
      else string += `${ unit[pr] } `
    }
    
    if( string.toLocaleLowerCase().includes( searchFilter ) ) return true
    return false 
  })
}