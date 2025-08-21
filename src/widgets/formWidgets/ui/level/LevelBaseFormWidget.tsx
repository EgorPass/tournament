import { CreateBaseFromDisciplineResultContainer } from "../../containers/level/createBaseFromDiscipineResultContainer";
import { CreateBaseFromLevelResultContainer } from "../../containers/level/createBaseFromLevelResultContainer";
import { createFirstLevel, createNextLevel } from "../../config/level/createCondition";
import { useLevelBaseForm } from "../../model/level/useLevelBaseForm";
import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { Condition } from "../../../../shared/components/inputFields/condition";


export const LevelBaseFormWidget = () => {
  const { firstLevel } = useLevelBaseForm()
  return ( 
    <>
      {
        firstLevel ? (
          <FormRowAtRadio
              title = "Основание создания этапа"
              radioList = { createFirstLevel }
            />
          ) : (
            <FormRowAtRadio 
              title = "Основание создания этапа"
              radioList = { createNextLevel }
            />
          )
      }
      <Condition when = "createLevel" is = {['fromDisciplineResult']}>
        <CreateBaseFromDisciplineResultContainer />
      </Condition>

      <Condition when = "createLevel" is = { ["fromLevelResult"]}>
        <CreateBaseFromLevelResultContainer />
      </Condition>
    </>
  )
}