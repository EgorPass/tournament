import { useEffect } from "react";
import { useGetLevelProps } from "./useGetLevelProps"
import { excludeVersusTypeForGroup, excludeVersusTypeForTimeTrial, exludeVersusTypeForNew, exludeVersusTypeForNotNew} from "../../config/level/sortCondition"

export const useSortAndGroup = () => {
  const { values, form } = useGetLevelProps();

  const resetVersus = () => form?.change("sort.versus", "")

  const { sort, createLevel } = values
  useEffect( () => {
    
    if( sort.type === "timeTrial" ) form?.change("sort.qual", "")

    if( createLevel === "new") {
      if( !!exludeVersusTypeForNew.find(it => it === sort.versus ) )
        resetVersus()
    } 
    else {
      if( !!exludeVersusTypeForNotNew.find(it => it === sort.versus ) )
        resetVersus()

      if( sort.type === "timeTrial" ) {
        if( !!excludeVersusTypeForTimeTrial.find(it => it === sort.versus ) )
          resetVersus()
      }
      else {
        if( !!excludeVersusTypeForGroup.find(it => it === sort.versus ) )
          resetVersus()
      }
    }

  }
    , [ sort?.type, sort?.versus, createLevel ]
  )

  return { createLevel }
}