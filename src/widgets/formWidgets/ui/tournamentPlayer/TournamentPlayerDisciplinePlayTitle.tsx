import { FC } from "react";
import { ITournamentPlayer } from "../../../../types";
import styled from "styled-components";
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem";
import { TournamentPlayerName } from "../../../../entities/unit";

const UnitTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  align-items: center;
  justify-items: start;

  margin: 5px 0 5px 0;
  padding: 0;
  
`

const LabelForWrapper = styled.label`
  cursor: pointer;
`

const CheckboxWrapper = styled.div`
  justify-self: center;
`

export const TournamentPlayerDisciplinePlayTitle:FC<ITournamentPlayer> = ( tournament_player ) =>  (
    <LabelForWrapper>
      <UnitTitleWrapper>

        <CheckboxWrapper>
          <Checkbox
            name = "onStart"
            value = { tournament_player.id }
            // title = "на позиции"
            />
        </CheckboxWrapper>
        <TournamentPlayerName {...tournament_player} />

    </UnitTitleWrapper>
  </LabelForWrapper>
)
