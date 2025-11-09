import { useEffect, useState } from "react"
import { ILevel } from "../../../types"
import { useDBSetMethods } from "../../../shared/store/offlineDB"
import { getOverElem } from "../lib/getOverElem"
import { resetDataAtReplacedLevels } from "../lib/resetDataAtReplacedLevels"

export const useLevelDrag = ( levels: ILevel[] ) => {
  
  const { changeAtDB } = useDBSetMethods()
  
  const [ list, setList ] = useState<ILevel[]>(
    levels.sort( ( x, y ) => +x.levelPosition - +y.levelPosition ) 
  )

  useEffect( () => {
    setList( levels.sort( ( x, y ) => +x.levelPosition - +y.levelPosition )  )
  }
    , [ levels, levels.length ]
  ) 

  const sortAndDragLevel = <T>(elem: T ) => ( dropZone: Element ) => {
    if( 
      !elem 
      || 
        ( 
          typeof elem !== "object"
          || !("id" in elem ) 
      )
    ) return false 

    const { levelPosition, id } = elem as unknown as ILevel
      if( !levelPosition || !id ) return false 

    const overElem = getOverElem( list , dropZone.id )
      if( !overElem ) return false

    const overPosition = overElem.levelPosition
    
    setList( list =>  list.map( it => {
      if( it.id === id ) it.levelPosition = overPosition
      if( it.id === dropZone.id ) it.levelPosition = levelPosition
      return it
      })
      .sort((x, y) => +x.levelPosition - +y.levelPosition ) )

    return true
  }

  const saveLevelList = async () => {
      for( let i = 0, len = list.length; i < len; i++ ) {
        let level: ILevel 
        const  { levelPosition, createLevel } = list[ i ]

        list[i].levelPosition = i + ""

        if( levelPosition === "0" && createLevel === "fromDisciplineResult") {
          level = list[ i ]
        }
        else {
          level = { ...resetDataAtReplacedLevels( list[i], levelPosition ) }
        }

        await changeAtDB("level", level )
      }
  }

  return {
    sortAndDragLevel, saveLevelList, list
  }
}