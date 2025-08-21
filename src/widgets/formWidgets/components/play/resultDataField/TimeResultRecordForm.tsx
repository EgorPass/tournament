import { FC } from "react";
import styled from "styled-components";
import { InputNumber } from "../../../../../shared/components/inputFields/inputNumber";

const TournamentPlayerResultRecord = styled.div`
  display: grid;
  grid-template-columns: 51px 51px 51px;
  grid-column-gap: 8px;
  align-items: center;

  & input::placeholder {
    text-align: center;
  }

`
export const TimeResultRecordForm: FC<{ name: string, stopper?: boolean, }> = ( { name, stopper = true } ) => (
  <TournamentPlayerResultRecord>
    <InputNumber
      name = { `${ name }.min` }
      placeholder = "мин"
      valid = { false }
      length = { 3 }
    />
    <InputNumber
      name = { `${ name }.sec` }
      placeholder = "сек"
      valid = { false }
      length = { stopper ? 2 : 3 }
      max = { 59 }
    />
    <InputNumber
      name = { `${ name }.ms` }
      placeholder = "мс"
      valid = { false }
      length = { 3 }
      // max = { 999 }
    />
  </TournamentPlayerResultRecord>

)
