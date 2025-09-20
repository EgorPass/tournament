import { FC } from "react";
import { ILevel } from "../../../types";
import { LevelBasedContainer } from "../containers/LevelBasedContainer";
import { levelTranslate } from "../../../shared/lib/translater/levelTranslater";
import styled from "styled-components";


const CategoryWrapper = styled.div`
  & > div:nth-child(2) {
    padding: 0 0 0px 15px;
  }
`

const LevelCategories: FC<{list: string[], title: string}> = ({ list, title }) => (
  <div>
    <span>{ title }:&nbsp;</span>
    {
      list.length > 0 ? (
        list.map( (it, idx, arr ) => (
          <span key = { "men-" + it }>{ `${it}${ idx === arr.length - 1 ? ".": "; "}` }</span>
        ))
      ) : (
        <>категории отсутствуют.</>
      )
    }
  </div>
)

export const LevelSelectionBlock:FC<ILevel> = (level) => (
  <>
    <LevelBasedContainer { ...level! } /> 
    <CategoryWrapper>
      <div>В этапе учавствуют категории:</div>
      { 
        level.categories?.check === "not-use" ? ( 
          <div>все</div>
        ) : (
          <div>
            <LevelCategories 
              title="Мужской пол" 
              list = { level.categories.mensList } 
            />
            <LevelCategories 
              title="Женский пол" 
              list = { level.categories.womensList } 
            />
        </div>
        )
      }
    </CategoryWrapper>
    <div>
      <div>Из которых выбирают:
        <span>&nbsp;
          {
            level.units?.condition === "all" ? (
              <span>всех</span>
            ) : (
              <span>по { level.units?.qual } участников, показавших { levelTranslate[level.units?.from] } результат </span>
            )
          }
        </span>
      </div>
    </div>
  </>
)