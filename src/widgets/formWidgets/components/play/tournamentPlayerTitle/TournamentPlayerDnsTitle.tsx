import { FC } from "react";
import { ITournamentPlayer } from "../../../../../types";
import { TournamentPlayerName } from "../../../../../entities/unit";
import { Checkbox } from "../../../../../shared/components/inputFields/checkBoxItem";
import styled from "styled-components";
import { UnitTitleWrapper } from "../Wrappers";


const LabelForWrapper = styled.label`
  cursor: pointer;
`

const CheckboxWrapper = styled.div`
  justify-self: center;
`

export const TournamentPlayerDnsTitle: FC<ITournamentPlayer> = (player) => (
  <LabelForWrapper>
    <UnitTitleWrapper>
      <CheckboxWrapper>
        <Checkbox
          name = "onStart"
          value = { player.id }
          // title = "на позиции"
          />
      </CheckboxWrapper>
      <TournamentPlayerName {...player} />
    </UnitTitleWrapper>
  </LabelForWrapper>
  
)