import { useEffect } from "react"
import { useGetLevelProps } from "./useGetLevelProps"

export const useLevelUnits = () => {
  const { values, form } = useGetLevelProps()
  const { units, createLevel } = values
  
  useEffect( () => {
    if( units.condition === "all" ) {
      form?.change("units.from", "")
      form?.change("units.qual", "")
    }

  }
    , [ units?.condition,  ]
  )

  useEffect( () => {
    if( createLevel === "new") {
      form?.change("units", {
        condition: "all",
        from: "",
        qual: "",
      })

    }
  }
    , [ createLevel ]
  )

  const newLevel = createLevel === "new"
  return { newLevel }
}