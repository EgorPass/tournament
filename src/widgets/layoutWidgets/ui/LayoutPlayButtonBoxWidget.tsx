import { BackButtonFeature, ClosePlayerModalData, NextLevelButtonFeature, PlayButtonFeature,  ResetPlayButtonFeature, usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useGetPlayerModalData } from "../../../shared/store/redux/slices/playerModalData"
import { IPLayLayoutContext } from "../../../types"
import { LayoutButtonBox } from "../components/LayoutButtonBox"
import { OneToOnePlayButtons } from "../containers/OneToOnePlaytBottons"
import { CirclePlayButtons } from "../containers/CirclePlayButtons"
import { useGetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"
import { EndDisciplineButtons } from "../containers/EndDisciplineButtons"
import { useGetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting"
import { BackButtonPlayerReitingFeature } from "../../../features/layoutFeatures/ui/BackButtonPlayerReitingFeature"

export const LayoutPlayButtonBoxWidget = () => {
  const bookmark = useGetBookMark()
  const playerModalReiting = useGetPlayerModalReiting()

  const { pathname } = useLocationHooks()
  const { level, fullFinished, isLastLevel  } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const { status: playerModal } = useGetPlayerModalData()

  return (
    <LayoutButtonBox type = "create-buttons-container" >
      
      {
        !playerModal && bookmark === "play" && pathname === "discipline" 
        ? (
          <>
            {
              !fullFinished && (
                <>
                  { !!level && level.try === "OneToOne" && <OneToOnePlayButtons /> }
                  
                  {!!level && level.try === "circle" && <CirclePlayButtons /> }
                </>
              )
            }
            {
              fullFinished && !isLastLevel && (
                <>
                  <BackButtonFeature />
                  
                  { !!level && level.try === "circle" && (
                    <>
                    <PlayButtonFeature 
                      title = "Попытка"
                      action = "try"
                      layoutPlace = "save"
                      disabled = { false }
                    />
                    <NextLevelButtonFeature layoutPlace = "reset"/>
                    </>
                  )
                  }
                  { !!level && level.try === "OneToOne" && (
                    <NextLevelButtonFeature layoutPlace = "save" />
                  ) 
                  }
                </>
              )
            }
            {
              fullFinished && isLastLevel && (
                <EndDisciplineButtons/>
              )
            }

          </>
      
        ) 
        : bookmark === "reiting" ? (
          <>
            {
              ( !playerModalReiting.status && !playerModal ) && <BackButtonFeature />
            }
            {
              playerModalReiting.status && (
                <BackButtonPlayerReitingFeature />
              )
            }
            {
              playerModal && (
                <>
                  <PlayButtonFeature 
                    layoutPlace="save"
                    title = "Сохранить"
                    action = "saveFromModalWindow"
                    disabled = { false }
                  />
                  <ResetPlayButtonFeature />
                  <ClosePlayerModalData/>
                </>
              )
            }
          </>
        ) : (
          <>
            <BackButtonFeature />
          </>
        ) 
      
      }
    
    </LayoutButtonBox>
  )
}