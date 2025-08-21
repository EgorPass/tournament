import { useSuspenseQuery } from "@tanstack/react-query"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useDBGetMethods } from "../../../shared/store/offlineDB"
import { DQTypes, ExcludeTypePlayerReiting, IDiscipline, ILevel, ITournamentPlayerDQ, ITournamentPlayerResult } from "../../../types"
import { useGetDisciplineReitingList } from "./useGetDisciplineReitingList"
import { TLevelData, TSubTry } from "../lib/types"
import { apiDate } from "../../../shared/lib/api/apiDate"

export const useCreateCurrentPlayerReiting = ( discipline_id: string, player_id: string ) => {

  const { getItemsFromDB } = useDBGetMethods()

  const { data: discipline } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", discipline_id )
    
  const { data: { menPlayers, womenPlayers } } = useGetDisciplineReitingList( discipline! )
    
  const { data: levels, } = useGetSuspenseStateList<ILevel>("level", "discipline_id", discipline_id )

  return useSuspenseQuery({
    queryKey: ["current_tournament_player_reiting", { "id": player_id, discipline_id } ],
    queryFn: async() => {
  
      const player = [ ...menPlayers, ...womenPlayers ]
        .reduce( ( list , item ) => {
          list.push( ...item.players )
          return list
        }, [] as ExcludeTypePlayerReiting[] )
        .find( player => player.id === player_id )
  
      const results = await getItemsFromDB<ITournamentPlayerResult>( "level_result", "tournament_player_id", player_id )
      const dqs = await getItemsFromDB<ITournamentPlayerDQ>( "tournament_player_dq", "tournament_player_id", player_id )
  
      let category: string | undefined
      const levelsData: TLevelData[] = []
  
      if( player && discipline ) {
  
        category = getPlayerCategory( player, discipline )

        const { condition } = discipline
        const isTime = condition === "time"
            
        levels
          .sort( ( x, y ) => +x.levelPosition - +y.levelPosition )
          .reduce( (acc, level) => {
            const { id: level_id, name: level_name } = level

            const level_results = Object.entries(
              results
                .filter( it => it.level_id === level_id )
                .reduce( reudcePlayerResult(isTime), {} )
            )
            level_results.forEach( ([tryLevel, subTryList]) => {
              subTryList.sort( (x, y) => x.subTry - y.subTry )
            })

            const level_dqs = filterPlayerDqs( discipline.dqs, dqs, level_id )
            acc.push( { level_name, level_dqs, level_results } )
            return acc
          }, levelsData as TLevelData[])
  
      }
  
      return {
        category,
        player,
        levelsData
      }
    }
  }) 
  
}

function reudcePlayerResult( isTime: boolean  ) {
  return ( tryList: { [ tryItem: string] : TSubTry[] }, item: ITournamentPlayerResult ) => {

    const { try: tryItem, subTry, result, fuckup } = item
    if( !(tryItem in tryList)){
      tryList[ tryItem ] = []
    }
    const errors = fuckup.map( ({desc, data }) => {
      return {
        desc,
        data: (isTime ? apiDate.convertMsInTime( data ) : data + "" )
      }
    })
    
    tryList[ tryItem ].push( {
      result: ( isTime? apiDate.convertMsInTime( result) : result + "" ),
      errors,
      subTry
    } )
    return tryList
  }
}

function filterPlayerDqs( disciplineDqs: DQTypes[], dqs: ITournamentPlayerDQ[], level_id: string  ) {
  return dqs
        .filter( it => it.level_id === level_id )
        .map( dq => {
          if( dq.dq === "dns"){
            return `${ dq.dq } - не явка`
          }
          const disciplineDq = disciplineDqs
                .find( it => it.name === dq.dq )
          return `${dq.dq} ${ !!disciplineDq ? ` - ${disciplineDq.description}`: "" } `
        })
}

function getPlayerCategory( player:ExcludeTypePlayerReiting, discipline: IDiscipline ) {
  const categoryState = ( player.gender === "boy" ? discipline.menCategories : discipline.womenCategories )
  .find( it => {
    const { from, to } = it
    const playerData = discipline.categories === "age" ? +player.age : +player.weight
    return +from <= +playerData && playerData <= +to
  })
  
  return categoryState ? `${categoryState.from} - ${categoryState.to}`: ""
}

