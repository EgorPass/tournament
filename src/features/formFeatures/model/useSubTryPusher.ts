import { useForm } from "react-final-form"
import { IModalPlayerLayoutConsummer, ITournamentPlayer, TDataToTreeModalForm } from "../../../types"
import { useModalPlayLayoutContextConsumer } from "../../layoutFeatures/model/contextPlayLayoutProvider"


type TSubTryData = {
  tryAtLevel: number;
  subTry: number;
  tournament_player_id: string;
  player: ITournamentPlayer;
}

export const useSubTryPusher = (   state: TDataToTreeModalForm[], setState: React.Dispatch<React.SetStateAction<TDataToTreeModalForm[]>>) => {
  
  const form = useForm()
  const { players } = useModalPlayLayoutContextConsumer() as IModalPlayerLayoutConsummer

  const createSubTryData = (tryAtLevel: number, subTry: number ) => {
      return players.map( player => {
        return {
          tryAtLevel,
          subTry,
          tournament_player_id: player.id,
          player,
        }
      })
    }
  
    const changeSubTryForm = ( tryAtLevel: number, subTry: number ) => {
      players.forEach( player => {
        form.change( `results.result-${tryAtLevel}-${ subTry }.${ player.id }`, { results: {}, errors: [] } )
        form.change( `dq.result-${tryAtLevel}-${ subTry }.${ player.id }`, [] )
      })
    }
  
    const subTryPusher = ( tryAtLevel: number ) => {
      const tryData = state.find( it => it.tryAtLevel === tryAtLevel )
      const { data } = tryData!
      const newSubTryNumber = Math.max( ...data.flat().map( it => it.subTry ), 0 ) + 1
      const newData: TSubTryData[] = [ ...createSubTryData( tryAtLevel, newSubTryNumber )]
      changeSubTryForm(  tryAtLevel, newSubTryNumber )
      setState( prev => prev.map( it => {
        if( it.tryAtLevel !== tryAtLevel ) return it
        return {
          tryAtLevel,
          data: [ ...data, newData ]
        }
      }) )
    }
  
    const tryPusher = ( ) => {
      const tryAtLevel = state.length + 1
      const newData: TSubTryData[] = [ ...createSubTryData( tryAtLevel, 1 )]
      changeSubTryForm(  tryAtLevel, 1 )
      
      setState( prev => ([
          ...prev,
          {
            tryAtLevel,
            data: [ newData ]
          }
        ] ) )
    }

  return {
    subTryPusher, tryPusher
  }
}