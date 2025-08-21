import { useEffect } from "react"
import { useForm, useFormState } from "react-final-form"
import { DQTypes, ITournamentPlayerDQ, TDqModalFrom, TObjectStrings, TResultsModalForm } from "../../../../types"

type TCheckFunc = {
  obj: TResultsModalForm | TDqModalFrom
  id: string
  field: "dq" | "results"
  stopPosition: number
}
type TStopData = {
  [id: string] : {
      tryAtLevel: number,
      subTry: number,
      name: string,
      description: string,
  }
}

export const useCheckDQFrorPlayersModalForm = ( pastLevelDqs: ITournamentPlayerDQ[], dqsList: DQTypes[], playersId: string[] ) => {
  const form = useForm()
  const formState = useFormState()
  const checkAndResetFormField = useCheckAndResetModalFormField()
  const dq = formState.values.dq  as { [ id: string ] : { [idx: string ] : TObjectStrings[] } } | undefined
  const stopData: TStopData = {}
  const useEffectState: number[] = playersId.map( it => 0)

  // console.log( formState.values )

  if( !!dq ) {

    const discDqConsumer = Object.fromEntries( playersId.reduce( (acc, id ) => {
        const dqs = pastLevelDqs
                  .filter( it => it.tournament_player_id === id ).map( it => it.dq )
        acc.push( [id, dqs ])
        return acc
      }, [] as [ string, string[] ][]  )   
    )
    
    const levelDqConsumer = Object.fromEntries( 
      playersId.map( id => ([id, []] as [string, string[] ]) ) 
    )

    for( let idx in dq ) {
      const [ , tryAtLevel, subTry ] = idx.split("-").map( it => +it )
      const currentPosition = getNumberFromTitleResult( tryAtLevel, subTry )

      idMarker:
      for( let i = 0, idLen = playersId.length; i < idLen; i++) {
        const id = playersId[ i ]
        const isId = id in dq[ idx ]
       
        if( !isId ) continue;
        if( isId && ( id in stopData ) ) {
          const stopPosition = getNumberFromTitleResult( stopData[id].tryAtLevel, stopData[id].subTry )
          if( currentPosition >= stopPosition ) continue
        }

        const dqs = dq[ idx ][ id ].map( it => it.name )
        
        if( dqs.length > 0 ) {
          levelDqConsumer[ id ] = [...levelDqConsumer[ id ], ...dqs ]
          
          for( let j = 0, dqLen = dqsList.length; j < dqLen; j++) {
            const { type, qual, name, description } = dqsList[ j ]
            const playerDQList = type === "level"
                  ? [ ...levelDqConsumer[id] ]
                  : [...levelDqConsumer[id], ...discDqConsumer[id] ] 
            const currentDqLength = playerDQList.filter( it => it === name ).length
            if( currentDqLength >= +qual ) {
              stopData[ id ] = { name, description, subTry, tryAtLevel }
              useEffectState
                .splice( 0, useEffectState.length, 
                  ...playersId.map( idx => (
                    id === idx 
                    ? currentPosition 
                      :idx in stopData 
                      ? getNumberFromTitleResult( stopData[idx].tryAtLevel, stopData[idx].subTry )
                      : 0   
                  ))
                )
              continue idMarker
            }
          }
        }
      }
    }
  }

  useEffect( () => {
    // console.log( "in use effect form handle change.....", stopData )
    const { dq, results } = formState.values
    const stopDataArr = Object.entries( stopData )

    if( stopDataArr.length > 0 && !!dq && !!results  ) {
      stopDataArr.forEach( item => {
        const [ id, dataForStop ] = item 
        const stopPosition = getNumberFromTitleResult( dataForStop.tryAtLevel, dataForStop.subTry )

        checkAndResetFormField({ stopPosition, id, obj: dq, field: "dq" })
        checkAndResetFormField({ stopPosition, id, obj: results, field: "results" })
      })
    }    
    // console.log( "сбросс формы у модального окна ....")  
    // return () => { form.reset() }

  } ,[ ...useEffectState ] )

  return stopData
}

function useCheckAndResetModalFormField( ) {
  const form = useForm()
  return function ( {obj, id, stopPosition, field}: TCheckFunc ){
    const resetState = field === "dq" ? [] : { results: {}, errors: [] }
    for( let resultNumber in obj ) {
      const [ , tryAtLevel, subTry ] = resultNumber.split("-")
      const currentPosition = getNumberFromTitleResult( tryAtLevel, subTry ) 
      if( currentPosition > stopPosition ) {
        form.change( `${ field }.${ resultNumber }.${ id }`, resetState )
      }
    }
  }
}

function getNumberFromTitleResult( tryAtLevel: string | number, subTry: string | number ) {
  return +( "" + tryAtLevel + subTry )
}