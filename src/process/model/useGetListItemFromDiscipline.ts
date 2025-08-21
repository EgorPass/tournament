import { apiForCreateData } from "../../shared/lib/api/apiForCreateData"
import { useDBGetMethods, useDBSetMethods } from "../../shared/store/offlineDB"
import { ExcludeTypePlayerReiting, IDiscipline, ILevel, ITournamentPlayer, ITournamentUnit, TCategoryFabric } from "../../types"
import { PlayerReitingTree } from "../../widgets/resultInfoWidgets/lib/PlayerReitingTree"
import { useReducingLevelData } from "../../widgets/resultInfoWidgets/model/ useReducingLevelData"

type TReduceFabrice = {
          dataList: TCategoryFabric[]
          tournamentPlayers: ITournamentPlayer[]
          tournamentUnits: ITournamentUnit[]
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

    const tournamentPlayers = await getItemsFromDB<ITournamentPlayer>("tournament_player", "discipline_id", discipline_id )
    
    const discipline = await getItemFromDB<IDiscipline>( "discipline", "id", fromDiscipline )
    
    let state: "accept" | "error" = "accept"
    let menPlayers: TCategoryFabric[]= []
    let womenPlayers: TCategoryFabric[]  = []
    
    if( discipline && discipline.status === "gameOver" ) {
      const tournamentPlayersFromAnotherDiscipline = await getItemsFromDB<ITournamentPlayer>("tournament_player", "discipline_id", fromDiscipline )
      
      const listData = await getLevelListData( fromDiscipline, discipline!, tournamentPlayersFromAnotherDiscipline )
      const data = new PlayerReitingTree({
          boy: [], girl: [], dqs: (!!discipline ? discipline.dqs : []), 
          tournamentPlayers: tournamentPlayersFromAnotherDiscipline, 
      }).run( listData ).get() 

      const nextNumber = tournamentPlayers.length + 1

      const womensData = mappingPlayerData( data.womenPlayers, tournamentPlayers, nextNumber, currentLevel )
      const mensData = mappingPlayerData( data.menPlayers, tournamentPlayers, womensData.nextNumber, currentLevel )

      const idCash = [ ...womensData.idCash, ...mensData.idCash ]
      
      const fullListTournamentPlayers = [ 
                  ...womensData.plyersData.tournamentPlayers,
                  ...mensData.plyersData.tournamentPlayers            
      ]
      const fullListTournamentUnits = [
                  ...womensData.plyersData.tournamentUnits,
                  ...mensData.plyersData.tournamentUnits
      ]

      await changeAtDB( "tournament_unit", fullListTournamentUnits )
      await changeAtDB( "tournament_player", fullListTournamentPlayers )

      const boy = tournamentPlayers.filter( it => it.gender === "boy" && !idCash.includes( it.id ) )
      const girl = tournamentPlayers.filter( it => it.gender === "girl" && !idCash.includes( it.id ) )

      womenPlayers = reducePlayersFromAnotherDisciplineAndActulePlayers( womensData.plyersData.dataList, girl )
      menPlayers = reducePlayersFromAnotherDisciplineAndActulePlayers( mensData.plyersData.dataList, boy )


    }
    else {
      state = "error"
    }


    return {
      state, womenPlayers, menPlayers
    }
  }
}


function mappingPlayerData ( categoryFabricList: TCategoryFabric[], tournamentPlayers: ITournamentPlayer[] , nextNumber: number, level: ILevel) { 

  const { tournament_id, discipline_id } = level
  let newNumber = nextNumber

  const idCash: string[] = []

  const plyersData = categoryFabricList.reduce( ( acc, categoryFabric ) => {
    const { category, players } = categoryFabric 
            
    const players__ = players.reduce( ( list, player ) => {
    
        const { current_unit_id, age, weight, name, gender } = player 
      
        let tournamentUnit: ITournamentUnit | undefined = undefined
        let tournamentPlayer = tournamentPlayers.find( it => it.current_unit_id === current_unit_id )
        
        let newPlayer: ExcludeTypePlayerReiting

        if( !!tournamentPlayer ){
          newPlayer = {
            ...tournamentPlayer,
            levelReiting: player.levelReiting,
            levelStatus: player.levelStatus,
          }

          idCash.push( newPlayer.id )
        }
        else {
          const number = newNumber++ + ""
          tournamentUnit = {
            id: apiForCreateData.createUniqeId(),
            age, weight, current_unit_id, tournament_id, number
          }
          tournamentPlayer = {
            id: apiForCreateData.createUniqeId(),
            age, weight, current_unit_id, tournament_id, discipline_id, number, gender, name, status: "play", tournament_unit_id: tournamentUnit.id
          }

          newPlayer = {
            ...player,
            ...tournamentPlayer
          }
        }
      
        list.workList.push( newPlayer )
        if( tournamentPlayer ) {
          list.tournamentPlayers.push( tournamentPlayer )
        }
        if( tournamentUnit ) {
          list.tournamentUnits.push( tournamentUnit )
        }

        return list
    
    }, { tournamentPlayers: [], tournamentUnits: [], workList: [] } as Omit<TReduceFabrice, "dataList"> & { workList: ExcludeTypePlayerReiting[] } )
    
    acc.dataList.push( { category, players: players__.workList } )
    acc.tournamentPlayers.push( ...players__.tournamentPlayers )
    acc.tournamentUnits.push( ...players__.tournamentUnits )
    

    return acc
  } , { dataList: [], tournamentPlayers: [], tournamentUnits: [] } as TReduceFabrice  )


  return {
    idCash,
    plyersData,
    nextNumber: newNumber,
  }

}



function reducePlayersFromAnotherDisciplineAndActulePlayers( categoryFabric: TCategoryFabric[], tournamentPlayers: ITournamentPlayer[] ) {
   return categoryFabric.reduce( ( acc, categoryFabric ) => {
      const { category, players } = categoryFabric
      let length = players.length
      const newPlayers = tournamentPlayers.filter( player => {
        const [ from, to ] = category.split( " - ")
        return +from <= +player.age && +player.age <= +to
      }).map( player => ({
        ...player,
        levelReiting: length++,
        levelStatus: "play"
      })) as ExcludeTypePlayerReiting[]

      acc.push( { category, players: [ ...players, ...newPlayers ] } )
      return acc
    }, [] as TCategoryFabric[] ) 

}