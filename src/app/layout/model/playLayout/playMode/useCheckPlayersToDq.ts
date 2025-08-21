import { usePlayLayoutContextConsumer } from "../../../../../features/layoutFeatures"
import { useDBGetMethods } from "../../../../../shared/store/offlineDB"
import { DQTypes, IPLayLayoutContext, ITournamentPlayerDQ } from "../../../../../types"
import { TTournamentPlayerWithDq } from "./useSaveDataPlayMode"

export const useCheckPlayersToDq = () => {
  const { getItemsFromDB  } = useDBGetMethods() 
  const { level, discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext

  return async( dqsState: ITournamentPlayerDQ[] ) => {
    const tournamentPlayerWithDq: TTournamentPlayerWithDq[] = [] 
    for( let i = 0, len = dqsState.length; i < len; i++ ) {
      const { tournament_player_id, dq } = dqsState[i]
      const disciplineDQ = discipline!.dqs.find( it => it.name === dq )
      const props = !disciplineDQ 
                      ? [] : disciplineDQ.type === "level" 
                        ? [ "level_id", level!.id ]
                        : [ "discipline_id", discipline!.id ]

      const currentDQsPlayer = await getItemsFromDB<ITournamentPlayerDQ>(  "tournament_player_dq", "tournament_player_id", tournament_player_id, ...props)
      const currentDqQual = currentDQsPlayer.filter( it => it.dq === dq ).length
      let playerDqState = getDnsToPlayerLevelState( currentDQsPlayer )
          playerDqState = playerDqState ? playerDqState : 
          !!disciplineDQ?.qual && +disciplineDQ.qual <= currentDqQual ? disciplineDQ : null

        if( playerDqState ) {
          tournamentPlayerWithDq.push( { tournament_player_id, dq } )
        }
    }

    return tournamentPlayerWithDq
  }
}

function getDnsToPlayerLevelState ( playerDqs: ITournamentPlayerDQ[]) {
  const state = playerDqs.find( it => it.dq === "dns" )
  if(!state ) return null
  else return {
    qual: '1',
    name: "dns",
    description: "не явка",
    type: "discipline",
    reiting: [],
    looser: [],
  } as DQTypes
}
