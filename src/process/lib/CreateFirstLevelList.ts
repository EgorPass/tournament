import { ILevel, ITournamentPlayer } from "../../types";
import { PlayerReitingListConstructorToCategoryFabrica } from "../../widgets/resultInfoWidgets/lib/PlayerReitingListConstructorToCategoryFabrica";

export class CreateFirstLevelList extends PlayerReitingListConstructorToCategoryFabrica {

  filterTournamentPlayersToCategory( level: ILevel) {
    const { categories: { mensList, womensList } } = level

    this.tournamentPlayers.forEach( player => {
      if( player.gender === "boy") {
        this.reducePlayerInCategory( player, mensList )
      }
      if( player.gender === "girl" ) {
        this.reducePlayerInCategory( player, womensList )
      }
    } ) 
  }

  reducePlayerInCategory( player: ITournamentPlayer, categoryList: string[] ) {
    const category = this.findCategory( categoryList, player.age )
      if( category ) {
        if( !this.isCategoryInPlayerReitingData( player.gender, category ) ) {
          this.playerReitingData[ player.gender ][ category ] = [ ]
        }
        this.pushPlayerToPlayerReitingData( player, category )
      }
  }
  
  findCategory( categoryList: string[], age: string ) {
    return categoryList.find( cat => {
      const [ from, to ] = cat.split("-") 
      return ( +from.trim() <= +age ) && ( +age <= +to.trim() ) 
    })
  }

  isCategoryInPlayerReitingData( gender: string, category: string ) {
    return ( category in this.playerReitingData[ gender ] )
  }

  pushPlayerToPlayerReitingData( player: ITournamentPlayer,  category: string ) {
    this.playerReitingData[ player.gender ][ category ].push( {
      ...player,
      levelStatus: "play", 
      levelReiting: null, 
    } )
  }
}