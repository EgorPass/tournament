import { FC } from "react";
import { ITournament } from "../../../../../types";
import { sortTournamentListByName } from "../../../lib/sortTournamentByName";
import { TournamentLinkBoxList } from "../../tournamentLinkBoxList";

export const TournamentSortByName: FC<{tournaments: ITournament[]}> = ({tournaments}) => {
  const list  = sortTournamentListByName( tournaments )
  return <TournamentLinkBoxList list = { list } />
}