import { apiDate } from "../../../shared/lib/api/apiDate"
import { ILevel, ILevelList, ILevelListItem, ILevelReitingList, IPlayerReitingData, ITournamentPlayerDQ, ITournamentPlayerResult } from "../../../types"
import { ReducingLevels } from "./ReducingLevels"
import { TDqState, TReducingLevelData, TReitingCategoryList, TReitingCategoryObject, TReitingPlayerData, TResultState } from "./types"

export class ReducingPastLevels extends ReducingLevels {

  private levelsData: {
    level: ILevel | undefined,
    levelList: ILevelList
    levelReitingList: ILevelReitingList | undefined
  }[] = []
  private disciplineDq: ITournamentPlayerDQ[] = []
  private disciplineResults: ITournamentPlayerResult[] = []

  public reduceReitingForPastLevels( levelLists: ILevelList[], disciplineDq: ITournamentPlayerDQ[], disciplineResults: ITournamentPlayerResult[] ) {
    
    this.preparePastResults( levelLists, disciplineDq, disciplineResults  )

    return this.levelsData.reduce( ( acc, item ) => {
      const { level, levelList, levelReitingList } = item
      const { boyLevelReitingList, girlLevelReitingList } = this.flatLevelReitingList( levelReitingList! )

      const girl = Object.entries(
        levelList.list
        .filter( it => it.gender === "girl" )
        .reduce( 
          this.reduceGenderData( "girl", girlLevelReitingList, level! ), 
          {} as TReitingCategoryObject
        )
      )
      
      const boy = Object.entries(
        levelList.list
        .filter( it => it.gender === "boy" )
        .reduce( 
          this.reduceGenderData( "boy", boyLevelReitingList, level! ), 
          {} as TReitingCategoryObject 
        )
      )

      // console.log( boy )

      acc.push( { level: level!, girl, boy})

      return acc
    }, [] as TReducingLevelData[] )
  }

  private preparePastResults( levelLists: ILevelList[], disciplineDq: ITournamentPlayerDQ[], disciplineResults: ITournamentPlayerResult[] ) {
    levelLists.forEach( levelList => {
      const { level_id } = levelList
      const level = this.pastLevels.find( level => level.id === level_id )
      const levelReitingList = this.levelReitingList.find( it => it.level_id === level_id )
      if( level && levelReitingList) {
        this.levelsData.push( { level, levelReitingList, levelList })
      }
    })

    this.disciplineDq = disciplineDq
    this.disciplineResults = disciplineResults
    this.levelsData.sort( ( x, y) => +x.level!.levelPosition - +y.level!.levelPosition )
  }

  private reduceGenderData(  gender: "girl" | "boy", genderReitingList: IPlayerReitingData[], level: ILevel, ) {
    
    return <T extends ILevelListItem> (acc: TReitingCategoryObject, listItem: T, index: number, array: T[]) => {

      const { category, data, position: position_, } = listItem

      if( !(category in acc ) ) {
        acc[category] = []
      }

      const playersData = data.map( player_id => {

        const currentPlayerReiting = genderReitingList.find( it => it.tournament_player_id === player_id )

        const dqState = this.getPlayerDqState( currentPlayerReiting )
        let resultState: TResultState = {
          data: null,
          qualWins: false,
          wins: "",
        }
        if( !dqState.status || ( dqState.status && dqState.reiting ) ) {
          resultState = this.getPlayerResultState( player_id, level!  )
        }

        return{
          dqState,
          resultState,
          id: player_id,
          dqList: this.disciplineDq.filter( it => it.tournament_player_id === player_id ).map( it => it.dq ),
          name: this.setReitingListPlayerName( player_id ),
          levelReiting: currentPlayerReiting ? currentPlayerReiting.levelReiting: null,
          levelStatus: currentPlayerReiting ? currentPlayerReiting.levelStatus: "play"
        } as TReitingPlayerData
      })

      const position = level!.status === "play" ? position_ : 0
      acc[category].push( { position, playersData } )

      return acc 
    }

  }

  private getPlayerDqState(  currentPlayerReiting: IPlayerReitingData | undefined ) {
    function createDqState( dq = "", description = "", reiting = false, status = false ) {
      return {
        reiting,
        status,
        dq: ( status ? `DQ - ${ dq }: ${ description }` : "" ),
      } as TDqState
    }
    
      if( !!currentPlayerReiting && currentPlayerReiting.levelStatus.startsWith( "DQ" ) ) {
        const { levelStatus } = currentPlayerReiting
        const dqs = this.discipline.dqs 
        const dq = levelStatus.split( " - " )[1]
        if( dq === "dns" ) {
          return createDqState( dq, "не явка", false, true )
        }
        else {
          const dqType = dqs.find( it => it.name === dq )
          return createDqState( dq, dqType!.description, dqType!.reiting!.length > 0, true )
        }
      }
    
      return createDqState()
  }

  private getPlayerResultState( player_id: string, level: ILevel ) {
    const playerResults = this.disciplineResults.filter( it => it.level_id === level.id && it.tournament_player_id === player_id )
    const resultArr = playerResults.map( it => it.result )

    const levelCondition = level.win.condition
    const levelQual = level.win.qual
    const roundWinner = level.win.roundWinner

    const isTimeCondition = this.discipline.condition === "time"
    const bestTry = levelCondition === "bestTry" || roundWinner === "bestTry"

    const result = resultArr.length > 0 ? ( bestTry ? 
    ( isTimeCondition ?  Math.min( ...resultArr ) : Math.max( ...resultArr ) ) : 
    ( resultArr.reduce( (acc: number, it: number) => {
      acc +=it
      return acc
    }, 0) / resultArr.length  
  ) ) : null
    const data = !!result ? (  isTimeCondition ? apiDate.getResultToReiting( result ) : result ) : null

    const resultState: TResultState = {
      data,
      qualWins: false,
      wins: ""
    }

    if( ( levelCondition === "roundWinner" ) && ( roundWinner === "qualWin" ) ) {
      const qualWins = playerResults.filter( it => it.status ===  "winner" ).length
      resultState.qualWins = true
      resultState.wins = `${qualWins}/${levelQual}`
    }

    return resultState as TResultState
  }

  private flatLevelReitingList( levelReitingList: ILevelReitingList ) {
    const { boy, girl } = levelReitingList

    const boyLevelReitingList = boy.map( it => it.players ).flat()
    const girlLevelReitingList = girl.map( it => it.players ).flat()
    return { boyLevelReitingList, girlLevelReitingList }
  }

  private setReitingListPlayerName( id: string  ) {
    // console.log( this.tournamentPlayers )
    const player = this.tournamentPlayers.find( player => player.id === id )
    return `№ ${player!.number} ${player!.name}`
  }
}