import { FC } from "react";
import styled from "styled-components";
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem";

const ReturnToPosition = styled.div`
  user-select: none;
  display: grid;
  justify-items: left;
  padding: 10px 10px 20px 30px;
  color: ${ props => props.theme.themeColors.fontColor.primal };
  
  & label {
    display: grid;
    grid-template-columns: 40px auto;
    justify-items: left;
    cursor: pointer;
  }

`
export const ReturnPlayersToPosition:FC<{position: number }> = ( {position}) => (
  <ReturnToPosition>
    <label>
      <Checkbox name = "returnToPosition" value = { position } />
      <span>
        Вернуться к назначению результатов для играков...
      </span>
    </label>
  </ReturnToPosition>
)