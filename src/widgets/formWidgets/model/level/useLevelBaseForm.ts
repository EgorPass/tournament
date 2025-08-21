import { useEffect } from "react"
import { useGetStateList } from "../../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateList"
import { IDiscipline, ILevel } from "../../../../types"
import { useGetLevelProps } from "./useGetLevelProps"
import { useGetStateItem } from "../../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"

export const useLevelBaseForm = () => {
  const { discipline_id, values, form, createDatafromData } = useGetLevelProps()
  
  const { levelPosition, createLevel } = values
  
  const { data: levels } = useGetStateList<ILevel>("level","discipline_id", discipline_id, !!discipline_id )  
  
  const { data: discipline } = useGetStateItem<IDiscipline>("discipline", "id", discipline_id, !!discipline_id )

  const firstLevel = !levels || levels.length === 0 || (!!levelPosition && levelPosition === "0")
    
  useEffect( ()=> {
    if( createDatafromData ) {
      if( levels )
        form?.change( "levelPosition", `${ levels.length }` )
    }
  }
    ,[ ]
  )

  useEffect( () => {
    if( !values.tournament_id && !!discipline ) {
      form.change( "tournament_id", discipline.tournament_id )
    }
  }
    , [ discipline_id, discipline ]
  )

  useEffect( () => {
    if( createLevel === "new" || createLevel === "fromPastLevel"  ) {
      form?.change("fromResult", { 
        tournament: "",
        discipline: "",
        level: "" 
      } )
    }
  }
    ,[ createLevel ]
  )

  return { firstLevel, values }
}