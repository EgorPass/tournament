import { useForm, useFormState } from "react-final-form";
import { IModalPlayerLayoutConsummer, TDataToTreeModalForm, TModalDqCorteg, TModalResultCorteg } from "../../../types";
import { TSubTryData } from "../../../widgets/formWidgets/containers/play/PlayersTryDataList";
import { resetFields, filterAndReplaceResultsCorteg } from "../lib/filterResultsCorteg";
import { useModalPlayLayoutContextConsumer } from "../../layoutFeatures/model/contextPlayLayoutProvider";


export const useSubTryRemover = ( state: TDataToTreeModalForm[], setState: React.Dispatch<React.SetStateAction<TDataToTreeModalForm[]>> ) => {

  const form = useForm()
  const formState = useFormState()
  const {players} = useModalPlayLayoutContextConsumer() as IModalPlayerLayoutConsummer

  const subTryRemover = ( tryAtLevel: number, subTryNumber: number ) => {
    const tryData = state.find( it => it.tryAtLevel === tryAtLevel )
    const { data } = tryData!
    const { results, dq } = formState.values 


    let newDqData: TModalDqCorteg[] = []
    let newResultsData: TModalResultCorteg[] = []

    if( !!results && !!dq ) {
      const dqData = Object.entries( dq ) as TModalDqCorteg[]
      const resultsData = Object.entries( results ) as TModalResultCorteg[]

      // console.log( resultsData )

      if( data.length === 1 ) {
        if( state.length === 1 ) {
          newDqData = resetFields( dqData, true )
          newResultsData = resetFields( resultsData, false )
        }
        if( state.length > 1 ) {
          newResultsData = filterAndReplaceResultsCorteg( resultsData, tryAtLevel )
          newDqData = filterAndReplaceResultsCorteg( dqData, tryAtLevel ) 
        }
      }

      if( data.length > 1 ) {
        newResultsData = filterAndReplaceResultsCorteg( resultsData, tryAtLevel, subTryNumber  )
        newDqData = filterAndReplaceResultsCorteg( dqData, tryAtLevel, subTryNumber)
      }

      const newStateData = newResultsData.reduce( (acc, item ) => {
        const [ tryNumber, data ] = item 
        const [ , tryAtLevel, subTry ] = tryNumber.split("-").map( it => +it )
        const subTryList = Object.entries( data ).map( subTryItem => {
          const [ tournament_player_id ] = subTryItem
          const player = players.find( it => it.id === tournament_player_id )
          return { player, subTry, tryAtLevel, tournament_player_id  } as TSubTryData
        })

        const isFind = acc.find( it => it.tryAtLevel === tryAtLevel )
          if( !!isFind ) {
            isFind.data.push( subTryList )
          }
          else {
            acc.push( { tryAtLevel, data: [ subTryList ] } )
          }
        return acc
      }, [ ] as TDataToTreeModalForm[])

      form.change( "dq", { ...Object.fromEntries( newDqData ) } )
      form.change( "results", { ...Object.fromEntries( newResultsData ) } )
      setState( newStateData )
    }

  }

  return { subTryRemover }
}