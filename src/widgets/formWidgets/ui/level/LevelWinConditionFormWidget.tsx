import { RadioList } from "../../components/generic/list/radioList";
import { StyledGridContainer } from "../../../../shared/components/groupComponents";
import { roundWinner, winCondition } from "../../config/level/winConditionData";
import { fieldTargetClick } from "../../lib/fieldTargetClick";
import { useLevelWinCondition } from "../../model/level/useLevelWinCondition";
import { FormRowAtRadio } from "../../components/generic/formRow/formRowAtRadio";
import { Condition } from "../../../../shared/components/inputFields/condition";
import { RadioItem } from "../../../../shared/components/inputFields/radioBoxItem";
import { InputNumber } from "../../../../shared/components/inputFields/inputNumber";

export const LevelWinConditionFormWidget = () => {
  useLevelWinCondition();
  return (
    <FormRowAtRadio
      radioList = { winCondition }
      title = "Зачёт результатов"
    >
      <Condition when = "win.condition" is = { ['roundWinner']}>
        <RadioList list = { roundWinner }>
          <StyledGridContainer
            as = "label"
            className = "row-container__input-columns"
          >
            <RadioItem
              name = "win.roundWinner"
              title = "по количеству побед"
              value = "qualWin"
            />
            <InputNumber
              name = "win.qual"
              placeholder = "2"
              callback = { fieldTargetClick }
              valid = { false }
            />
          </StyledGridContainer>
        </RadioList>
      </Condition>
    </FormRowAtRadio>
  )
}