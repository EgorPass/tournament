import { FC } from "react";
import { ITournament } from "../../../types";
import styled from "styled-components";
import { StyledGridAreaItem } from "../../../shared/components/groupComponents";

const StyledOrganizerContainer = styled( StyledGridAreaItem )`
  display: flex;
  flex-flow: column;
  align-items: center;

  @media ( ${ props => props.theme.media.max } ) {
    align-items: flex-start;
    display: block;
    /* flex-direction: row; */
  }
`

export const TournamentOrganizer:FC<{ organizer: ITournament["organizer"]}> = ({ organizer }) => (
  <StyledOrganizerContainer
    $gridArea = "tour-organizer"
  >
    <div>Организатор соревнований: &nbsp;</div>
    <div>{ organizer }</div>
  </StyledOrganizerContainer>
)