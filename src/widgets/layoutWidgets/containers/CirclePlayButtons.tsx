import { useFormState } from "react-final-form"
import { PlayButtonFeature, usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { IPLayLayoutContext } from "../../../types"

export const CirclePlayButtons = ( ) => {
  const { valid } = useFormState()
  const { resultState, dqsState } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  
  return (
     <>
      <PlayButtonFeature 
        title = "Пропустить"
        action = "skip"
        layoutPlace = "back"
        disabled = { resultState || dqsState }
      />
      <PlayButtonFeature 
        title = "Следующий"
        action = "next"
        layoutPlace = "save"
        disabled = { !valid }
      />
    </>

  )
}