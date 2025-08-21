import styled from "styled-components"
import { GroupContentWrapper } from "../../../shared/components/groupComponents"
import { TournamentInfoWrapper } from "../components/tournamentInfoWrapper"


const DescriptionWrapper = styled(TournamentInfoWrapper)`
  display: block;

  & > p {
    margin: 0 0 10px 0;
    padding: 0;
    line-height: 1.5;
    &:last-child{
      margin: 0;
    };

  }
`

export const TournamentPlayDescription = () =>(
  <GroupContentWrapper>

    <DescriptionWrapper>
      <p>
        Выбираем дисциплниу и жмём СТАРТ.
      </p>
      <p>
        Список и группировка участников дисциплины будет формироваться, дополняться и отображаться по мере прохождения участниками этапов.
      </p>
    </DescriptionWrapper>
  </GroupContentWrapper>
)