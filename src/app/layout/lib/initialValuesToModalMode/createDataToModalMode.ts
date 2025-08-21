import { apiDate } from "../../../../shared/lib/api/apiDate"
import { ITournamentPlayer, TDataToTreeModalForm, TInitialValuesForModalForm, TObjectStrings } from "../../../../types"
import { TTryData } from "./reduceLevelResultsAndDqs"

export function createDataToTreeModalForm(  resultsData: TTryData[], players: ITournamentPlayer[] ) {
  return resultsData.reduce( (acc, item) => {
    const { tryAtLevel, data } = item
    const subTryArr = data.map( subTry => {
      return subTry.map( it => {
        const { tryAtLevel, subTry, tournament_player_id } = it
        const player = players.find( it => it.id === tournament_player_id )
        return {
          tryAtLevel, subTry, tournament_player_id, player: player!
        }
      })
    })
    acc.push({ tryAtLevel, data: subTryArr})
    return acc
  }, [] as TDataToTreeModalForm[] )
}

export function createInitialValuesForForm_( resultsData: TTryData[], condition: string ){

  return resultsData.reduce( (acc, item ) => {
    const { data } = item

    data.flat().forEach( playerData => {
      const { result, tournament_player_id, tryAtLevel, subTry, dqs } = playerData
      const path = `result-${tryAtLevel}-${ subTry }`
      // console.log( path )

      if( !( path in acc.results ) ) {
        acc.results[ path ] = {}
      }
      if( !(path in acc.dq ) ) {
        acc.dq[ path ] = {}
      }

      acc.dq[ path ][ tournament_player_id ] = dqs.map( it=> ({ name: it.dq, desc: it.desc, tournament_player_id }) )
      
      const fuckupRes = !result ? 0 
              : result.fuckup.reduce( (acc, it) => acc += +it.data, 0 );
      
      let point = !!result ? result.result : 0
            point = condition === "time" ? point - fuckupRes : point + fuckupRes
            point = point < 0 ? 0 : point 

      const results = createResultData( condition, point )
      const errors = !result ? [] as TObjectStrings[] : result!.fuckup.map( it => createResultData( condition, it.data, it.desc ) )
      acc.results[path][tournament_player_id] = {
        results, errors
      }
    });


    return acc
  }, { results: {}, dq: {} } as TInitialValuesForModalForm )
}

export function createResultData( condition: string, result: number, desc?: string ) {

  let data: TObjectStrings = {}
  if( condition === "time" ){
    const timeData = apiDate.convertMsInTime( result )
    data = createTimeObject( timeData ) 
  } 
  else {
    data = { point: result + ""}
  }

  return !desc ? data : { ...data, desc }
}

const check = ( str: string ) => !str.split("").every( it => it === "0")

function createTimeObject( timeData: string ): TObjectStrings {
  const [ hours, min, sec, ms ] = timeData.split(":") 
  const currentMinutes = ( +hours * 60 + +min ) + ""
  const data = [ currentMinutes, sec, ms ]
  return {
    min: data && check(data[0] )  ? data[0] : "",
    sec: data && check(data[1] ) ? data[1] : "",
    ms: data && check( data[2] ) ? data[2] : '',
  }
}

export function createDqList<T>( dqs: T[]) {

  return  [ ...dqs, {
    qual: '1',
    name: "dns",
    description: "не явка",
    type: "discipline",
    reiting: [],
    looser: [],
  } as T ]
}