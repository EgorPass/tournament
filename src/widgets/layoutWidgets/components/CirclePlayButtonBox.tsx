import { NextLevelButtonFeature, PlayButtonFeature, BackButtonToPlayFeature } from "../../../features/layoutFeatures"

export const CirclePlayButtonBox = () => (
  <>
    <BackButtonToPlayFeature />
    <PlayButtonFeature 
      title = "Попытка"
      action = "try"
      layoutPlace = "save"
      disabled = { false }
    />
    <NextLevelButtonFeature layoutPlace = "reset"/>
  </>
)
