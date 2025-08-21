import { useGetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"
import { IPLayLayoutContext, TDataToTreeModalForm, DQTypes, ITournamentPlayerDQ, ITournamentPlayer, TInitialValuesForModalForm } from "../../../../types"
import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures"
import { reduceLevelResultsAndDqs } from "../../lib/initialValuesToModalMode/reduceLevelResultsAndDqs"
import { createDataToTreeModalForm, createDqList, createInitialValuesForForm_ } from "../../lib/initialValuesToModalMode/createDataToModalMode"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import {  useState } from "react"

export const useInitialValuesToModalMode = () => {

  // console.log( "prepare data to modal mode .......")

  const { pathname } = useLocationHooks()
  const { 
    discipline, level, tournamentPlayerDQs, tournamentPlayerResults, tournamentPlayers
  } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const { status, playersId } = useGetPlayerModalData()
  const [ resetState, setResetState ] = useState<{}>({})
  

    let dqsList: DQTypes[] = []
    let players: ITournamentPlayer[] = []
    let pastLevelDqs: ITournamentPlayerDQ[] = []
    let dataToTreeModalForm: TDataToTreeModalForm[] = []
    let initialValuesForForm: TInitialValuesForModalForm = { results: {}, dq: {} }
    
    if( status && pathname === "discipline" ) {
      
      players = tournamentPlayers.filter( it => playersId.includes( it.id ) )
      
      const level_id = level!.id
      const currentLevelResults = tournamentPlayerResults.filter( result => result.level_id === level_id && playersId.includes( result.tournament_player_id ) )
      const currentLevelDqs = tournamentPlayerDQs.filter( dq => dq.level_id === level_id && playersId.includes( dq.tournament_player_id ) )
      
      const maxDqTryList = currentLevelDqs.map( it => it.try )
      const maxResultTryList = currentLevelResults.map(it => it.try )
      const maxTry = Math.max( ...maxDqTryList, ...maxResultTryList, 1 )
      
      const resultsData = reduceLevelResultsAndDqs( playersId, currentLevelResults, currentLevelDqs, maxTry )
      
      initialValuesForForm = createInitialValuesForForm_( resultsData, discipline!.condition ) 
      dataToTreeModalForm = createDataToTreeModalForm( resultsData, players )
      dqsList = createDqList( discipline!.dqs )
      pastLevelDqs = tournamentPlayerDQs.filter( dq => {
        const disciplineState = dq.discipline_id === discipline!.id
        const levelState = dq.level_id !== level_id
        const playerState = playersId.includes( dq.tournament_player_id ) 
        return disciplineState && levelState && playerState 
      })
    }

    // console.log("forms: ", initialValuesForForm )
    // console.log("render: ", dataToTreeModalForm )


    return { 
      initialValuesForForm, 
      dataToTreeModalForm, 
      dqsList, 
      status, 
      pastLevelDqs, 
      players,
      resetState,
      setResetState,
    }
  
}