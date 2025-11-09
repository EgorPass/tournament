import { useEffect } from "react"
import { ITournament, IUnit } from "../../../../types"
import { useRFFState } from "../../../../features/layoutFeatures/model/useRFFState"

type TData = ITournament[] | IUnit[]

export const useChangeExportListAction = ( data: TData, choose: string, listType: string, prop: string ) => {

  const { form, formState: { values } } = useRFFState()


  console.log( values )

   useEffect(()=> {
      if( values?.typeForExport.includes( choose ) ) {
        if( values[ prop ] === "all" && data )
          form.change(listType, [...data])
      }
      else form.change(listType, [])
    }
      , [ data, values?.typeForExport, values[ prop ] ]
    )
  
    useEffect( () => {
      if( values[ prop ] === "choose" )
        form.change(listType, [  ] )
    }
      , [  values[ prop ] ]
    )

    useEffect( () => {
      if( !values?.typeForExport.includes( "соревнования" ) )
        form.change("tournamentUnits", [ ])
    }
      , [ values?.typeForExport ]
    )
}