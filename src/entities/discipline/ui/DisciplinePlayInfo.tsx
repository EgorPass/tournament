import styled from "styled-components";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { IDiscipline, ILevel } from "../../../types";
import { LevelRulesBlock,  LevelSelectionBlock } from "../../level";
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList";
import { GroupContentWrapper } from "../../../shared/components/groupComponents";
import { GroupContentHead } from "../../../shared/components/heads";
import { DataDiv, DisciplineDescriptionWrapper, DisciplineInfoWrapper, LevelListItem, LevelsWrapper, UnOderList } from "../compoents/disciplineInfoWrapper";
import { DisciplineCondition } from "../compoents/disciplineCondition";
import { DisciplineDqs } from "../compoents/disciplineDqs";
import { DisciplineCategoriesItems } from "../compoents/disciplineCategoriesItems";




interface IProp {
  discipline: IDiscipline
}

export const DisciplinePlayInfo = suspenseHOCWrapper(
  ( { discipline }: IProp  ) => {

  console.log( ">>>>>>>>>>>>>>>>>>" )

    const { data, isSuccess } = useGetSuspenseStateList<ILevel>("level","discipline_id", discipline!.id )
    data.sort( (x, y) => +x.levelPosition - +y.levelPosition )
    
    const level = data.find( it => it.status === "play")
    console.log( discipline )

    if( isSuccess) {
      return (
        <DisciplineDescriptionWrapper>
          <DisciplineInfoWrapper >
            <DisciplineCondition discipline = { discipline! } />
            <DisciplineDqs discipline = { discipline! } /> 
            <DisciplineCategoriesItems discipline = { discipline! } />
          </DisciplineInfoWrapper>

          {
            !!level && discipline.status !== "gameOver" && (
              <DataDiv $topMargin="15px">
                <em>На данный момент проходит этап дисциплины - { level.name }!</em>
              </DataDiv>
            )
          }

          <LevelsWrapper>
            <GroupContentHead>Этапы дисциплины:</GroupContentHead>
            <UnOderList>
              {
                data.map( level => (
                  <LevelListItem key = { level.id } >
                    <GroupContentWrapper>
                      <GroupContentHead>{ level.name }</GroupContentHead>
                      <h6>Отбор для этапа:</h6>
                      <DataDiv>
                        <LevelSelectionBlock {...level } />
                      </DataDiv>
                      <h6>Правила этапа:</h6>
                      <DataDiv>
                        <LevelRulesBlock { ...level  } />
                      </DataDiv>
                    </GroupContentWrapper>
                  </LevelListItem> 
                ))
              }
            </UnOderList>

          </LevelsWrapper>
        </DisciplineDescriptionWrapper>
      )
    }
        else return null
    } 
)