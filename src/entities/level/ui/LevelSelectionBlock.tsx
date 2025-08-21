import { FC } from "react";
import { ILevel } from "../../../types";
import { GroupContentWrapper } from "../../../shared/components/groupComponents";
import { GroupContentHead } from "../../../shared/components/heads";
import { LevelBasedContainer } from "../containers/LevelBasedContainer";
import { levelTranslate } from "../../../shared/lib/translater/levelTranslater";
import { LevelCategoriesMap } from "../components/LevelCategoriesMap";


export const LevelSelectionBlock:FC<ILevel> = (level) => (

  <GroupContentWrapper>
    <GroupContentHead>Отбор для этапа</GroupContentHead>
      <LevelBasedContainer { ...level! } /> 
      <div>
        <div>В этапе учавствуют категории:</div>
        { 
          level.categories?.check === "not-use" ? ( 
            <div>все</div>
          ) : (
            <div>
              {
                level.categories?.mensList.length > 0 && (
                  <LevelCategoriesMap title = "Мужской пол:">
                    {
                      level.categories
                        ?.mensList.map( it => (<span key = { "men-" + it }>{ it } </span>))
                    }
                  </LevelCategoriesMap>
                )
              }
              {
                level.categories?.womensList.length > 0 && (
                  <LevelCategoriesMap title = "Женский пол:">
                    {
                      level.categories
                        ?.womensList.map( it => (<span key = {"women-" + it}>{ it } </span>))
                    }
                  </LevelCategoriesMap>
                
                )
              }
          </div>
          )
        }
        
      </div>
      <div>
        <div>из которых выбирают:</div>
        <div>
          {
            level.units?.condition === "all" ? (
              <span>всех</span>
            ) : (
              <span>по { level.units?.qual } участников, показавших { levelTranslate[level.units?.from] } результат </span>
            )
          }
        </div>
      </div>
  </GroupContentWrapper>
)