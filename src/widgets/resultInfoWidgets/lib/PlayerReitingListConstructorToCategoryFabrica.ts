import { ExcludeTypePlayerReiting, ITournamentPlayer, TCategoryFabric, TPlayersReitingLevelListItem } from "../../../types";
import { IPlayerReitingListConstructor, TPlayerReitingData } from "./types";

/**
 * первый класс в цепочке наследования от него наслудуются 
 *  =>
 * CreateLevelReitingListConstructor & PlayerReitingTree
 * =>
 * CreateFutureLevelReitingListData
 * =>
 */
export class PlayerReitingListConstructorToCategoryFabrica {
  protected tournamentPlayers: ITournamentPlayer[] = []
  protected playerReitingData: TPlayerReitingData = { boy: {} , girl: {} } 

  constructor( { 
    boy, girl, tournamentPlayers 
  }: IPlayerReitingListConstructor ) {
    this.tournamentPlayers = tournamentPlayers

    this.reduceGenderToPlayerReitingData( boy, "boy" )
    this.reduceGenderToPlayerReitingData( girl, "girl" )
  }

  protected reduceGenderToPlayerReitingData( genderList: TPlayersReitingLevelListItem[], gender: string ) {
    genderList.reduce( (acc, item ) => {

      const { category, players } = item

      const updatePlayers = players.map( it => {
        const player = this.tournamentPlayers.find( player => player.id === it.tournament_player_id )
        return {
          ...player!,
          levelReiting: it.levelReiting,
          levelStatus: it.levelStatus
        } as ExcludeTypePlayerReiting
      })

      if( category in acc[ gender ] ){
        acc[ gender ][ category ].push( ...updatePlayers )
      }
      else{
        acc[ gender ][ category ] = updatePlayers
      }

      return acc
    }, this.playerReitingData )
  }

  protected getCategoryFabrica( gender: string ) {
    // console.log( this.tournamentPlayers )

     return Object.entries( this.playerReitingData[ gender ] ).map( item => {
      const [ category, players ] = item
      return { category, players } as TCategoryFabric
    })
    .sort( (x, y) => {
      const xCategory = +x.category.split( " - ")[1]
      const yCategory = +y.category.split( " - ")[0]
      return xCategory - yCategory
    })
  }

  get() {
    const menPlayers = this.getCategoryFabrica( "boy" )
    const womenPlayers = this.getCategoryFabrica( "girl" )
    return { menPlayers, womenPlayers  }
  }

}

