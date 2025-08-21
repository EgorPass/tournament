import { usePlayFormPrepare } from "../../model/play/usePlayFormPrepare"

import { DisciplinePlayLevelWrapper } from "../../components/play/Wrappers"
import { RenderPlayersForm } from "../../containers/play/RenderPlayersForm"

import { GroupContentHead } from "../../../../shared/components/heads"
import { LevelPlayInfo } from "../../../../entities/level"

export const DisciplinePlayLevelFormWidget = () => {
  // console.log( "4 - discipline play level form .......",  )
  
  const { level, levelList, levelListItem, fullFinished, playersData, plyaerInGame } = usePlayFormPrepare()

  

  return (
    <>
      {
        !fullFinished ? (
          level && levelList && levelListItem ? (
            <DisciplinePlayLevelWrapper>
              <GroupContentHead>{ level.name }</GroupContentHead>
                <LevelPlayInfo
                  gender = { levelListItem!.gender }
                  category = { levelListItem!.category }
                  tryAtLevel = { levelList!.try }
                />
                <RenderPlayersForm 
                  playersData = { playersData }
                  playersInGame = { plyaerInGame }
                />
            </DisciplinePlayLevelWrapper>
          ) : (
            <div>
              упс... что, то пошло не так
            </div>
          )
        ) : (
          <div>
            все участники закончили попытку
          </div>
        )
      }
         
       
    </>
  )
}