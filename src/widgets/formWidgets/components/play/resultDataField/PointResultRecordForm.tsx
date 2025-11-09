import { FC } from "react";
import { InputNumber } from "../../../../../shared/components/inputFields/inputNumber";
import styled from "styled-components";

const TournamentPlayerResultRecord = styled.div`
  display: grid;
  grid-template-columns: 60px;
  grid-column-gap: 8px;
  align-items: center;

  & input::placeholder {
    text-align: center;
  }

`

export const PointResultRecordForm: FC<{ name: string }> = ({ name }) =>  (
  <TournamentPlayerResultRecord> 
      <InputNumber
      name = { `${ name }.point` }
      placeholder = "очки"
      valid = { false }
    />

  </TournamentPlayerResultRecord>
)
