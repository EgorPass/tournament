import { ITournament } from "../../../types";
import { GroupContentWrapper } from "../../../shared/components/groupComponents";
import { TournamentInfoWrapper } from "../components/tournamentInfoWrapper";
import { TournamentAddress } from "../components/tournamentAddress";
import { TournamentDate } from "../components/tournamentDate";
import { TournamentOrganizer } from "../components/tournamentOrganizer";
import { FC } from "react";

export const TournamentInfoBlock: FC<ITournament> = ( { address, date, organizer } ) => (
  <GroupContentWrapper>
    <TournamentInfoWrapper>
      <TournamentAddress address = { address } />
      <TournamentDate date = { date } />
      <TournamentOrganizer organizer = { organizer } />
    </TournamentInfoWrapper>
  </GroupContentWrapper>
)