import { useEffect } from "react"
import { useGetStateItem } from "../../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { IDiscipline } from "../../../../types"
import { useGetLevelProps } from "./useGetLevelProps"

export const useLevelCategories = () => {

  const { discipline_id, form, initialValues, values } = useGetLevelProps()
  const { data: discipline, isSuccess } = useGetStateItem<IDiscipline>("discipline", "id", discipline_id, !!discipline_id )

  const { categories: { check } } = values
  const menCategories: string[] = []
  const womenCategories: string[] = []

  if( isSuccess ) {
    menCategories.push( ...discipline!.menCategories.map( it => (
      `${it.from} - ${it.to}`
    ))  )
    womenCategories.push( ...discipline!.womenCategories.map( it => (
      `${it.from} - ${it.to}`
    )))
  }

  useEffect( () => {
    // console.log( discipline )
    if( check === "not-use" ) {
      form?.change("categories.mensList", menCategories )
      form?.change("categories.womensList", womenCategories )
    }
    if( check === "use" ){
      form?.change("categories.mensList", [ ] )
      form?.change("categories.womensList", [ ] )
    }
  }
    , [ values?.categories?.check, discipline, discipline_id ]
  )
  
  // console.log( values)
  return {
    values, initialValues, menCategories, womenCategories, form
  }

}
