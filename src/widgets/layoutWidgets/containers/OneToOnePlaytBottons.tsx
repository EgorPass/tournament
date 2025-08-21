import { useFormState } from "react-final-form"
import { PlayButtonFeature, usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { IPLayLayoutContext } from "../../../types"


export const OneToOnePlayButtons = () => {
  const { valid } = useFormState()
  const { resultState, dqsState, level } = usePlayLayoutContextConsumer() as IPLayLayoutContext


  const isQualRoundWinner = !!level && level!.win.condition === "roundWinner" && level.win.roundWinner === "qualWin" ? true : false

      console.log( isQualRoundWinner )

  if( isQualRoundWinner ) return (
    <>
      <PlayButtonFeature 
        title = "Пропустить"
        action = "skip"
        layoutPlace = "back"
        disabled = { resultState || dqsState }
      />
      <PlayButtonFeature 
        title = "Сохранить"
        action = "save"
        layoutPlace = "save"
        disabled = { !valid }
      />
    </>
  )
  else return (
    <>
      <PlayButtonFeature 
        title = "Пропустить"
        action = "skip"
        layoutPlace = "back"
        disabled = { resultState || dqsState }
      />
      <PlayButtonFeature 
        title = "Сохранить"
        action = "save"
        layoutPlace = "reset"
        disabled = { !valid   }
      />
      <PlayButtonFeature 
        title = "Следующий"
        action = "next"
        layoutPlace = "save"
        disabled = { !( resultState || dqsState ) || !valid }
      />
    </>
  )
  
}