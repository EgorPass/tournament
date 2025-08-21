import { usePlayLayoutContextConsumer } from "../../../../../features/layoutFeatures"
import { apiForCreateData } from "../../../../../shared/lib/api/apiForCreateData"
import { IPLayLayoutContext, ITournamentPlayerDQ } from "../../../../../types"

type TObjString = {[k:string]: string }
type TDqList =  { [ key: string ] : TObjString[] } | undefined
interface IGetPlayerDQs {
  onStart: string[]
  dq: TDqList,
  subTry: number,
}

export const useGetPlayersDqs = () => {
  const { levelList, levelListItem, level, currentLevelReitingList } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  

  const idWithOutDQ = currentLevelReitingList.filter( it => !it.levelStatus.startsWith("DQ")).map( it => it.tournament_player_id)

  const getDQToSubmit = ( dq: TDqList, tryAtLevel: number, subTry: number ) => {
    const playersDQs: ITournamentPlayerDQ[] = [];
    if( !!dq && Object.keys( dq ).length > 0 ) {
      for( let tournament_player_id in dq ) {
        dq[tournament_player_id].forEach( ( it: {[key: string]: string} ) => {
          const playerDQ = apiForCreateData.createTournamentPlayerDQ({
            level: level!, tournament_player_id, tryAtLevel, dq: it.name, desc: it.desc, subTry
          })
          playersDQs.push( playerDQ )
        })
      }
    }
    return playersDQs
  }
  
  return ( { onStart,  dq, subTry }: IGetPlayerDQs ) => {
    const tryAtLevel = levelList!.try
    const dnsDQs = levelListItem!.data
    .filter( id => idWithOutDQ.includes( id ) )
    .filter( id => !onStart.includes( id ) )
          .map( it => ( 
              apiForCreateData.createTournamentPlayerDQ({ 
                level: level!, 
                tryAtLevel, 
                tournament_player_id: it, 
                dq: "dns", 
                desc: "не явка",
                subTry,
                
              })
            ))

    const playersDQs = getDQToSubmit( dq, tryAtLevel, subTry )
    return [ ...playersDQs, ...dnsDQs ]
  }
}