import { apiForCreateData } from "../../shared/lib/api/apiForCreateData"
import { useDBGetMethods, useDBSetMethods } from "../../shared/store/offlineDB"
import { ExcludeTypePlayerReiting, ICategoriesItems, IDiscipline, ILevel, ITournamentPlayer, ITournamentUnit, TCategoryFabric } from "../../types"
import { PlayerReitingTree } from "../../widgets/resultInfoWidgets/lib/PlayerReitingTree"
import { useReducingLevelData } from "../../widgets/resultInfoWidgets/model/ useReducingLevelData"

type TReduceFabrice = {
          dataList: TCategoryFabric[]
          tournamentPlayers: ITournamentPlayer[]
          tournamentUnits: ITournamentUnit[]
        }

type TMappingPlayers = {
  list: TCategoryFabric[]
  units: ITournamentUnit[], 
  players: ExcludeTypePlayerReiting[] 
}

export const useGetListItemFromDiscipline = () => {

  const { getItemFromDB, getItemsFromDB } = useDBGetMethods()
  const {  changeAtDB } = useDBSetMethods()
  const getLevelListData = useReducingLevelData()


  return async( currentLevel: ILevel ) => {

    const {
      discipline_id,
      fromResult: { discipline: fromDiscipline }
    } = currentLevel

    const fromDisciplineItem = await getItemFromDB<IDiscipline>( "discipline", "id", fromDiscipline )
    
    const currentDiscipline = await getItemFromDB<IDiscipline>( "discipline", "id", discipline_id )

    let state: "accept" | "error" = "accept"
    let menPlayers: TCategoryFabric[]= []
    let womenPlayers: TCategoryFabric[]  = []
    
    if( fromDisciplineItem && fromDisciplineItem.status === "gameOver" && !!currentDiscipline) {
      const tournamentPlayersFromAnotherDiscipline = await getItemsFromDB<ITournamentPlayer>("tournament_player", "discipline_id", fromDiscipline )
      
      const listData = await getLevelListData( fromDiscipline, fromDisciplineItem!, tournamentPlayersFromAnotherDiscipline )
      const data = new PlayerReitingTree({
          boy: [], girl: [], dqs: (!!fromDisciplineItem ? fromDisciplineItem.dqs : []), 
          tournamentPlayers: tournamentPlayersFromAnotherDiscipline, 
      }).run( listData ).get() 

      const { menCategories, womenCategories } = currentDiscipline

      const womens = reduceAndFilterGenderPlayers( data.womenPlayers )
            .reduce( createDisciplineTFabriceCategories( womenCategories ), [])
            .map( filterQualityPlayersFromTFabriceCategories( currentLevel ) )
            .reduce( 
              mappingPlayers( currentLevel ), 
              { list: [], units: [], players: [] } as TMappingPlayers 
            )
      const mens = reduceAndFilterGenderPlayers( data.menPlayers )
            .reduce( createDisciplineTFabriceCategories( menCategories ), [])
            .map( filterQualityPlayersFromTFabriceCategories( currentLevel ) )
            .reduce( 
              mappingPlayers( currentLevel ), 
              { list: [], units: [], players: [] } as TMappingPlayers 
            )
            
      await changeAtDB( "tournament_unit", [...womens.units, ...mens.units ] )
      await changeAtDB( "tournament_player", [ ...womens.players, ...mens.players ] )
            
      menPlayers = [ ...mens.list ]
      womenPlayers = [ ...womens.list ]
    }
    else {
      state = "error"
    }

    return {
      state, womenPlayers, menPlayers
    }
  }
}


function reduceAndFilterGenderPlayers( categoryFabricList: TCategoryFabric[] ) {

  return categoryFabricList.reduce( (list, item ) => {
    const { players } = item
    list.push( ...players.filter( player => player.levelReiting !== null ) )
    return list 
  }, [] as ExcludeTypePlayerReiting[] )
}

function createDisciplineTFabriceCategories( categories: ICategoriesItems ) {

  return ( acc: TCategoryFabric[], player: ExcludeTypePlayerReiting ) => {

    const { age } = player
    const categoryItem = categories.find( it => +it.from <= +age && +age <= +it.to)

    if( !!categoryItem ) {
      const category = `${ categoryItem.from } - ${ categoryItem.to }`
      const isFind = acc.find( it => it.category === category )

      if( !!isFind ) {
        isFind.players.push( player )
      }
      else {
        acc.push( {category, players: [ player ] } )
      }

    }

    return acc
  }
}

function filterQualityPlayersFromTFabriceCategories( level: ILevel ) {

  const { units: {  qual, from }} = level

  return <T extends TCategoryFabric>( item: T ) : T  => {
    const { category, players } = item
    const endPosition = !!qual && +qual > 0 ? +qual: players.length
      players.sort( (x,y) => +x.levelReiting! - +y.levelReiting! ).slice()

      if( from === "badUnits" ) {
        players.reverse()
      }

    return {
      category, players: players.slice( 0, endPosition ) 
    } as T
  } 
}

function mappingPlayers( level: ILevel ) {
  return ( acc: TMappingPlayers, item: TCategoryFabric  ) => {
    const { players, category } = item 
    const { tourUnit, tourPlayer } = createNewPlayerData( players, level )
    acc.units.push( ...tourUnit )
    acc.players.push( ...tourPlayer )
    acc.list.push( { category, players: tourPlayer } )
    return acc
  }
} 


function createNewPlayerData( players: ExcludeTypePlayerReiting[], level: ILevel ) {

  const { tournament_id, discipline_id } = level 

  return players.reduce( ( acc: {
      tourUnit: ITournamentUnit[], 
      tourPlayer: ExcludeTypePlayerReiting[]
    },  
  player: ExcludeTypePlayerReiting ) => {
    const { current_unit_id, age, weight, number } = player 

    const tourUnit = {
      id: apiForCreateData.createUniqeId(),
      age, weight, current_unit_id, tournament_id, number
    } as ITournamentUnit
    const tourPlayer = {
      ...player,
      id: apiForCreateData.createUniqeId(),
      tournament_id, discipline_id,
      levelStatus: "play",
      levelReiting: null,
    } as ExcludeTypePlayerReiting 

    acc.tourUnit.push( tourUnit )
    acc.tourPlayer.push( tourPlayer )
    return acc
  }, { tourUnit: [], tourPlayer: [] })
}
