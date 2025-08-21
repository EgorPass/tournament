import { RadioList } from "../../components/generic/list/radioList";
import { StyledGridListContainer, StyledGridContainer } from "../../../../shared/components/groupComponents";
import { sort, sortVersusSingleFromNew, sortVersusSingleFromResult, sortVersusGroupFromResult } from "../../config/level/sortCondition";
import { useSortAndGroup } from "../../model/level/useSortAndGroup";
import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { Condition } from "../../../../shared/components/inputFields/condition";
import { InputNumber } from "../../../../shared/components/inputFields/inputNumber";

export const LevelSortAndGroupFormWidget = ( ) => {
  const { createLevel } = useSortAndGroup()
  return (
    <FormRowAtRadio
      title = "Группировка участников"
      radioList = { sort }
      >
        <Condition when = "sort.type" is = { ["timeTrial"] }>
          {
            createLevel === "new" ? (
              <RadioList list = { sortVersusSingleFromNew } />
            ) : (
              <RadioList list = { sortVersusSingleFromResult } />
            )
          }
        </Condition>
      
        <Condition when = "sort.type" is = { ["group"]}>
          <StyledGridListContainer>
            <StyledGridContainer className = "row-container__input-columns">
              <span>по</span>
              <InputNumber
                name = "sort.qual"
                placeholder = "2"
                />
              <span>спортсмена</span>
            </StyledGridContainer>
          </StyledGridListContainer>
          {
            createLevel === "new" ? (
                <RadioList list = { sortVersusSingleFromNew } />
            ) : (
              <RadioList list = { sortVersusGroupFromResult } />
            ) 
          }
        </Condition>
    </FormRowAtRadio>
  )
}