import { StyledGridListContainer, StyledGridContainer } from "../../../../shared/components/groupComponents";
import { Condition } from "../../../../shared/components/inputFields/condition";
import { InputNumber } from "../../../../shared/components/inputFields/inputNumber";
import { RadioItem } from "../../../../shared/components/inputFields/radioBoxItem";
import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { unitsCondition, unitsFrom } from "../../config/level/unitsConditionData";
import { useLevelUnits } from "../../model/level/useLevelUnits";


export const LevelChooseUnitFormWidget = ( ) => {
  const { newLevel } = useLevelUnits()
  if( newLevel ) return null
  else return (
    <FormRowAtRadio
      title = "Выбор участников"
      radioList = { unitsCondition }
    >
      <Condition when = "units.condition" is = {["qual"]}>
        <StyledGridListContainer>
          <StyledGridContainer
            className = "row-container__input-columns"
            >
            <span>по</span>
            <InputNumber
              name = "units.qual"
              placeholder = "2"
            />
            <span>спортсмена</span>
          </StyledGridContainer>
          { 
            unitsFrom.map ( it => (
              <RadioItem
                key = { it.value }
                name = { it.name }
                title = { it.title }
                value = { it.value } 
              />
            ))
          }
        </StyledGridListContainer>
      </Condition>
    </FormRowAtRadio>
  )
}