import { ExcludeTypePlayerReiting,  } from "../../../types";
import { TCategoryReitingData, TReitingCategoryList, TReitingPlayerData } from "./types";
import { CreateLevelReitingListConstructor } from "./CreateLevelReitingListConstructor";


/**
 * третий класс в цепочке наследования,
 * наследуется от 
 * PlayerReitingListConstructorToCategoryFabrica
 * =>
 * CreateLevelReitingListConstructor
 * 
 * 
 * это класс реализует лист для списка рейтинга
 * 
 * это последний класс в наследовании
 */
export class CreateFutureLevelReitingListData extends CreateLevelReitingListConstructor {

  create( ) {
    // console.log( this )

    const boy = this.createReitingCategoryForReiting( "boy" )
    const girl = this.createReitingCategoryForReiting( "girl" )
    return { boy, girl, level: this.level }
  }

  createReitingCategoryForReiting( gender: string ) {
    const { sort: { versus  } } = this.level


    return this.getCategoryFabrica(gender).reduce( (list, item) => {
      const { category, players } = item
      this.sortPlayers( players, versus )
      const playersGroup = this.reducePlayersToDataList( players )
                              .reduce( this.mappingPlayerData, [] )
      
    

      const isFind =  list.find( it => it[0] === category )
        if( !isFind ) {
         list.push( [ category, playersGroup] )
        }
        else {
          isFind[1].push( ...playersGroup )
        }
      return list
    }, [] as TReitingCategoryList[] )
  }

  private mappingPlayerData ( acc: TCategoryReitingData[], players: ExcludeTypePlayerReiting[], index: number, array: ExcludeTypePlayerReiting[][] ) {

    const playersData = players
        .filter( it => !!it )
        .map( player => {
          return {
            dqState: { reiting: false, status: false, dq: "" },
            resultState: null,
            dqList: [],
            name: `№ ${player.number} ${player.name}`,
            id: player!.id,
            levelReiting: player.levelReiting,
            levelStatus: player.levelStatus
          } as TReitingPlayerData
        })

      acc.push( { playersData, position: 0 } )
    return acc
  }
}