import { ExcludeTypePlayerReiting, ILevel, ILevelListItem, IPlayerReitingData, TCategoryFabric, TPlayersReitingLevelListItem } from "../../types";
import { CreateLevelReitingListConstructor } from "../../widgets/resultInfoWidgets/lib/CreateLevelReitingListConstructor"

export class CreateLevelList extends CreateLevelReitingListConstructor {
  reducePlayerToLevelListItem(position: number, list: TCategoryFabric[], level: ILevel, gender: string ){
    const data = list.map( it => {
      const { category, players } = it
      return {
        category, players: players.slice()  
      }
    })
    .reduce( ( acc, item ) => {
      const { category, players  } = item
      const playersGroup = this.reducePlayersToDataList( players )
                                .map( this.mappingPlayerData )
                                .map( data => ( {
                                    category, position: position++, gender, data
                                  }) as ILevelListItem
                                )
      acc.push( ...playersGroup )
      return acc
    }, [ ] as ILevelListItem[] )

    return{ data, position }
  }
  mappingPlayerData( item: ExcludeTypePlayerReiting[], index: number, array: ExcludeTypePlayerReiting[][] ) {
    return item.filter(it=> !!it).map( it => it.id )
  }
  mappingPlayersListToReiting( list: TCategoryFabric[] ) {
    return list.reduce( (acc, it ) => {
      const { category, players } = it
      const plyaersToReiting = players.map( it => ({
        tournament_player_id: it.id,
        levelStatus: "play", //it.levelStatus,
        levelReiting: null //it.levelReiting,
      })) as IPlayerReitingData[]
      acc.push( {
        category,
        players: plyaersToReiting
      })
      return acc
    }, [] as  TPlayersReitingLevelListItem[] )
  }
}