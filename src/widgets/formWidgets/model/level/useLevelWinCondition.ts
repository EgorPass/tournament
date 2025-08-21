import { useEffect } from "react"
import { useGetLevelProps } from "./useGetLevelProps"

export const useLevelWinCondition = () => {

  const { form, values } = useGetLevelProps()
  
  useEffect( () => {
    if( values?.win?.condition !== "roundWinner" ) {
      form?.change("win.qual", "")
      form?.change("win.roundWinner", "")
    }
    if( values?.win?.condition === "roundWinner" && values?.win?.roundWinner !== "qualWin" ) {
      form?.change( "win.qual", "")
    }
  }
    , [ values?.win ]
  )
}