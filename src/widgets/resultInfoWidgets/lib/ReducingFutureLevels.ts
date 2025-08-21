import { ILevel, TPlayersReitingLevelListItem } from "../../../types"
import { CreateFutureLevelReitingListData } from "./CreateFutureLevelReitingListData"
import { ReducingLevels } from "./ReducingLevels"
import { TReducingLevelData, TReitingCategoryList } from "./types"

type TReduceCategories = {
  currentLevel: ILevel
  pastLevel: ILevel | undefined
  gender: "boy" | "girl"
  genderList: string[]
  results: TPlayersReitingLevelListItem[]
}

export class ReducingFutureLevels extends ReducingLevels {

  create() {
    return this.futureLevels.reduce( (acc, currentLevel) => {

      const { 
        createLevel,
        levelPosition,
        fromResult: { level: fromLevelId },
        categories: { mensList, womensList },
      } = currentLevel

      let pastLevel: ILevel | undefined = undefined 
      if( createLevel === "fromLevelResult" ){
        pastLevel = this.pastLevels.find( it => it.id === fromLevelId )
      }
      if( createLevel === "fromPastLevel" ){
        pastLevel = this.pastLevels.find( it => +it.levelPosition === +levelPosition - 1 )
      }

      const boy = this.recurtionForReduceResults( { pastLevel, currentLevel, genderList: mensList, gender: "boy", results: [] }  )
      const girl = this.recurtionForReduceResults( { currentLevel, pastLevel, genderList: womensList, gender: "girl", results: [] } )

      // console.log( boy )

      const data = new CreateFutureLevelReitingListData( {boy, girl, tournamentPlayers: this.tournamentPlayers, level: currentLevel }).create()

      if( data.girl.length === 0 ) {
        data.girl = this.setCategoriesForEmptyList( womensList )
      }
      if( data.boy.length === 0 ) {
        data.boy =this.setCategoriesForEmptyList( mensList ) 
      }

      acc.push( data )
      return acc
    }, [] as TReducingLevelData[])
  }

  setCategoriesForEmptyList( categoriesList: string[]): TReitingCategoryList[] {
    return categoriesList.map( it => ( [ it, []  ] ) )
  }

  recurtionForReduceResults( { currentLevel,  pastLevel, genderList, gender, results } : TReduceCategories ) :  TPlayersReitingLevelListItem[] {
    if( pastLevel === undefined ) {
      return results
    }

    const genderCategories = this.findReitingListFromPast( pastLevel, gender )
    const startPositionToCopy = this.setStartPosition( currentLevel, pastLevel )
    const data = this.filterAndMappingGenderCategories( currentLevel, genderCategories, genderList, startPositionToCopy )
    const nextLevel = this.pastLevels.find( it => +it.levelPosition === ( +pastLevel.levelPosition - 1 ) )

    results.push( ...data )

    return this.recurtionForReduceResults({
      currentLevel,
      pastLevel: nextLevel,
      gender,
      genderList,
      results
    })

  } 

  /**
   * возвращает levelReitingList[ gender ]
   * 
   * @param pastLevel - ILevel
   * @param gender - "boy" | "girl"
   * @returns 
   */
  findReitingListFromPast( pastLevel: ILevel, gender: "boy" | "girl" ) {
    const pastLevelReitingList = this.levelReitingList.find( it => it.level_id === pastLevel.id )
    if( !pastLevelReitingList ) {
      return [] as TPlayersReitingLevelListItem[]
    }
    else {
      return gender === "boy" ? pastLevelReitingList.boy : pastLevelReitingList.girl
    }
  }

  /**
   * поиск стартовой позиции для копирования участников
   * учитывая кого барть худших или лучших
   * 
   * @param currentLevel - ILevel
   * @param pastLevel  - ILevel
   * @returns 
   */
  setStartPosition( currentLevel: ILevel, pastLevel: ILevel ) {
    let startPositionToCopy = 0
    const { id: fromLevelId } = pastLevel
    const currentLevelUintFrom = currentLevel.units.from
    if( currentLevelUintFrom === "badUnits" ) {
      startPositionToCopy = this.futureLevels
      .filter( it => it.fromResult.level === fromLevelId && it.units.from === "bestUnits" )
      .map( it => it.units.qual )
      .reduce( (acc, item ) => {
        if( !isNaN( +item ) ) {
          acc += +item
        }
        return acc
      }, 0 )
    }

    return startPositionToCopy
  }

  filterAndMappingGenderCategories( currentLevel: ILevel, genderCategories: TPlayersReitingLevelListItem[], genderList: string[], startPositionToCopy = 0 ){

    return genderCategories
    .filter( it => {
      const { category } = it
      const index = genderList.findIndex( it => it === category )
      if( index >= 0 ){
        genderList.splice( index, 1 )
      }
      return index >=0 
    })
    .map( it => {
      const { category, players } = it
      const stopPosition = currentLevel.units.condition === "qual" && currentLevel.units.qual !== "" ? ( startPositionToCopy + +currentLevel.units.qual ): players.length
      
      const newPlayers = players
      .filter( it => !it.levelStatus.startsWith( "DQ" ) )
      .filter( it => it.levelReiting !== null )
      .sort( (x, y) => x.levelReiting! - y.levelReiting! )
      .slice( startPositionToCopy, stopPosition )

      return {
        category,
        players: newPlayers
      } as TPlayersReitingLevelListItem
    })
  }

}