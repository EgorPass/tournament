import { ExcludeTypePlayerReiting, DQTypes, ILevel, TPlayStatus } from "../../../types"
import { PlayerReitingListConstructorToCategoryFabrica } from "./PlayerReitingListConstructorToCategoryFabrica"
import { IPlayerReitingListConstructor, TReducingLevelData, TReitingCategoryList, TReitingPlayerData } from "./types"


/**
 * Второй класс в цепочке наследования,
 * наследуется от 
 * PlayerReitingListConstructorToCategoryFabrica
 * 
 * это последний класс в наследовании
 */

export class PlayerReitingTree extends PlayerReitingListConstructorToCategoryFabrica{
  private idCash: string[] = []
  private dqs: DQTypes[] = []

  constructor({ 
    boy, girl, tournamentPlayers, dqs
  }: IPlayerReitingListConstructor & { dqs: DQTypes[]} ) {
    super( {boy, girl, tournamentPlayers} )
    this.dqs = dqs
  }

  run( data = [] as TReducingLevelData[] ) {
    data.sort( (x, y) => +y.level.levelPosition - +x.level.levelPosition )

    for( let levelData of data ) {
      const { boy, girl, level } = levelData 
      
      if( level.status === "prepare") {
        continue
      }
      
      boy.forEach( this.forEachGenderData("boy", level ))
      girl.forEach( this.forEachGenderData("girl", level ))
    }

    return this
  }

  private forEachGenderData( gender: string, level: ILevel ) {

    return ( data: TReitingCategoryList ) => {
      const category = data[0]
      const players = data[1]
            .map( it => it.playersData ).flat()
            .filter( it => !this.includesInCash( it.id ) )
            .reduce( this.reducePlayerData( level ), [] )

      const playerWithoutResults = players.filter( it => it.levelReiting === 0 )
      const playerWithResults = players.filter( it => it.levelReiting !== null && it.levelReiting > 0 )      
      const playersWithDq = players.filter( it => it.levelReiting === null && it.levelStatus.startsWith( "DQ"))
      const position = this.getPosition( gender, category )

      const playersWithReiting = this.sortingPlayersWithResultsInCurrentLevel( position, playerWithResults, level )

      this.updateData( gender, category, [...playerWithoutResults,...playersWithReiting, ...playersWithDq ] )
    }
  }

  private sortingPlayersWithResultsInCurrentLevel( position: number, players: ExcludeTypePlayerReiting[], level: ILevel) {
    return players
          .sort( (x, y) => +x.levelReiting! - +y.levelReiting! )
          .map( player => ({
                            ...player,
                            levelReiting: position++
                          })
          )
  }

  private reducePlayerData( level: ILevel ) {
    return ( acc: ExcludeTypePlayerReiting[], playerData: TReitingPlayerData, idx: number ) => {
      const isPlayer = this.tournamentPlayers.find( it => it.id === playerData.id )
        if( !!isPlayer ) {

          const levelStatus = playerData.levelStatus
          const isLevelPlay = level.status === "play"
          const { isDq, isDqInReiting } = this.isPlayerDq( playerData )
          const isPlayerInReiting = !isDq || ( isDq && isDqInReiting )
          
          let levelReiting: number | null = null

          // if( isPlayer && isPlayer.gender === "girl" && isPlayer.number === "9") {
          //   console.log( isPlayer )
          //   console.log( playerData )
          // }

          if( isLevelPlay ) {

            levelReiting = 
              isPlayerInReiting && playerData.levelReiting !== null 
                ? playerData.levelReiting 
                // : isPlayerInReiting && playerData.levelReiting == null ? idx + 1
                : !isDq && playerData.levelReiting === null ? idx + 1 : null 


          }
          else {
            levelReiting = isPlayerInReiting ? playerData.levelReiting : null
          }

          acc.push( {
            ...isPlayer,
            levelReiting,
            levelStatus,
          })
        }
      return acc
    }
  }

  private isPlayerDq( playerData: TReitingPlayerData ) {

    let dq: DQTypes | undefined = undefined
    let isDq: boolean = false
    let isDns: boolean = false
    let isDqInReiting: boolean = false
    
    if( playerData.levelStatus.startsWith("DQ")) {
      const dqName = playerData.levelStatus.split(" - ")[1]
      isDns = dqName === "dns"
      dq = isDns ? undefined: this.dqs.find( it => it.name === dqName ) 
      isDq = isDns ? true: !!dq
      isDqInReiting = isDns ? false : dq ? dq.reiting.length > 0 : false
    }
    
    return {
      isDq, isDqInReiting
    }

  }

  private isCategory(gender: string, category: string) {
    return category in this.playerReitingData[ gender ]
  }

  private includesInCash( id: string ) {
    return this.idCash.includes( id )
  }

  private getPosition( gender: string, category: string ) {
    let position = 1
    if( this.isCategory( gender, category ) ) {
      position = this.playerReitingData[ gender ][ category ].filter(it => it.levelReiting !== null ).length + 1
    }
    return position
  }
  
  private updateData( gender: string, category: string, playersList: ExcludeTypePlayerReiting[] ) {

    if( !(category in this.playerReitingData[gender]) ) {
      this.playerReitingData[gender][category] = []

    }

      const playersWithZero = [
            ...this.playerReitingData[ gender][category]
                          .filter( it => it.levelReiting === 0 ), 
            ...playersList
                          .filter( it => it.levelReiting === 0 ) 
            ]
                          
      const playerWithDq = [ 
                ...this.playerReitingData[ gender][category]
                    .filter( it => ( 
                      it.levelReiting === null && it.levelStatus.startsWith( "DQ" ) 
                    )), 
                ...playersList
                    .filter( it => ( 
                      it.levelReiting === null && it.levelStatus.startsWith( "DQ" ) 
                    )) 
                ]

      const playerWithReitingFirst = this.playerReitingData[ gender ][ category ]
                  .filter( it => it.levelReiting !== null && it.levelReiting !== 0 )
                  .sort( ( x, y ) => x.levelReiting! - y.levelReiting! )
      
      const playersWithReitingLast = playersList
                  .filter( it => !!it.levelReiting && it.levelReiting > 0 )
                  .sort( ( x, y ) => x.levelReiting! - y.levelReiting! )
      
      
      this.playerReitingData[ gender ][ category ] = [ ...playerWithReitingFirst, ...playersWithZero, ...playersWithReitingLast, ...playerWithDq ]
    
    this.updateIdCash( playersList )
  }
  
  private updateIdCash( data: ExcludeTypePlayerReiting[] ) {
    this.idCash.push( ...data.map( it => it.id ) )
  }
  
}