import { FC } from "react";
import { ITournament } from "../../../types";
import { apiDate } from "../../../shared/lib/api/apiDate";
import styled from "styled-components";
import { StyledGridAreaItem } from "../../../shared/components/groupComponents";

const StyledTournamentDateContainer = styled(StyledGridAreaItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  

  @media (${props => props.theme.media.max}) {
    flex-direction: column;
    justify-content: center;
  }
`

export const TournamentDate: FC<{date: ITournament["date"]}> = ({date}) =>  (
  <StyledTournamentDateContainer $gridArea = "tour-date">
    <div>{ apiDate.setLocaleDate( date )  } </div>
    <div>{ apiDate.setLeftDays( date ) }</div>
  </StyledTournamentDateContainer>
)
