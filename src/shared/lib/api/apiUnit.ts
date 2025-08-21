import { apiDate } from "./apiDate"
import { IDiscipline, IUnit } from "../../../types"

export const apiUnit = {
  getUnitCategory( discipline: IDiscipline, unitGender: string, unitAge: string, unitWeight: string ) {
    const categories = unitGender === "boy" ? discipline.menCategories : discipline.womenCategories
    const range = discipline.categories === "age" ? unitAge : unitWeight
    const result = categories.find( (it)=> ( +it.from <= +range && +range <= +it.to))
    if( result ) {
      const string = `${result.from} - ${result.to}`
      return string
    }
    else return ""
  },
  getUnitProps( unit: IUnit, age?: string, weight?: string ) {
    const gender: {[key: string]: string} = {
      "boy": "Мужской пол",
      "girl": "Женский пол",
    } 
    const unitDate = apiDate.setLocaleDate( unit!.birthday )
    const unitGender = gender[ unit?.gender ]
    const unitWeight = ( 
      weight ? weight :  unit?.weight) + `${unit?.weight ? " кг." : "    -"}`
    let unitAge = age ? age:  apiDate.getAge( unit?.birthday, new Date() )
    unitAge += " " + apiDate.getYearLetters(unitAge + "")
    return {
      unitAge, unitDate, unitGender, unitWeight
    }
  }
}