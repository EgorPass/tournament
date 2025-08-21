import { useEffect } from "react"
import { useRFFState } from "../../../../features/layoutFeatures/model/useRFFState"
import { ITournament, IUnit } from "../../../../types"

type TData = ITournament[] | IUnit[]


export const useChangeImportListAction = (data: TData, selectData: TData, selectType: string, listType: string ) => {

  const { form,formState: { values } } = useRFFState()


  useEffect(() => {
    if( values[ selectType ] === "all" ) {
      form.change( listType, [ ...data ])
    }
    
    if( values[ selectType ] === "none"  ) {
      form.change( listType, [ ])
    }

  }
    ,[ data, values[ selectType ] ]
  )

  useEffect(( ) => {
    if( selectData.length !== data.length ) {
      form.change( selectType, "choose" )
    }
    if( selectData.length === data.length ) {
      form.change( selectType, "all" )
    }

  }
    , [ selectData.length,   ]
  )

}