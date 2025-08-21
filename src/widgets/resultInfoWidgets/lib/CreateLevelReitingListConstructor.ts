import { ExcludeTypePlayerReiting, ILevel, } from "../../../types";
import { IPlayerReitingListConstructor } from "./types";
import { PlayerReitingListConstructorToCategoryFabrica } from "./PlayerReitingListConstructorToCategoryFabrica";

/**
 * второй класс в цепочке наследования,
 * наследуется от PlayerReitingListConstructorToCategoryFabrica
 * =>
 * 
 * класс реализует сортировку участников с типом ExcludeTypePlayerReiting
 * 
 * от этого класса неследуется
 * =>
 * CreateFutureLevelReitingListData
 */
export class CreateLevelReitingListConstructor extends PlayerReitingListConstructorToCategoryFabrica {

  protected level: ILevel

  constructor( { boy, girl, tournamentPlayers, level }: IPlayerReitingListConstructor & { level: ILevel } ) {
    super( { boy, girl, tournamentPlayers } )
    this.level = level
  }

  protected reducePlayersToDataList( players: ExcludeTypePlayerReiting[] ) {
    const { sort: { qual, versus  } } = this.level

    const data: ExcludeTypePlayerReiting[][] = []
    const snakeArray:  ExcludeTypePlayerReiting[][] = []

    const lengthId = !!qual ? +qual : 1
    const columnLength = lengthId > 1 ? Math.ceil( players.length / lengthId ) : players.length

    let lap = 0
    while( lap < lengthId ) {
      const even = ( lap === 0 ) || ( ( lap % 2 ) === 0 )
      let buffer: ExcludeTypePlayerReiting[] = []
          buffer = players.splice(0, columnLength )
        if( !even && versus !== "equals" ) {
          buffer.reverse()
        }
      snakeArray.push( buffer )
      lap++
    }

    for( let i = 0; i < columnLength; i++ ) {
      const playersData: ExcludeTypePlayerReiting[] = []
      for( let j = 0; j < lengthId; j++ ) {
        playersData.push( snakeArray[ j ][ i ] )
      }
      data.push( playersData )
    }

    return data
  }

  protected sortPlayers( players: ExcludeTypePlayerReiting[], versus: string ) {
    players.sort( this.sortPrediact( versus ) )
    if( versus === "fromLast" || versus === "fromBad" ) players.reverse()
  }
  protected sortPrediact( versus: string ) {
    return ( x: ExcludeTypePlayerReiting, y: ExcludeTypePlayerReiting ) => {
      if( versus === "fromLast" || versus === "fromFirst" ) return +x.number - +y.number
      else {
        if( !!x.levelReiting && !!y.levelReiting ) {
          return +x.levelReiting - +y.levelReiting
        }
        else if( !!x.levelReiting && !y.levelReiting ) return 1
        else if( !x.levelReiting && !!y.levelReiting) return -1
        else return 0
      } 
    }
  }

}