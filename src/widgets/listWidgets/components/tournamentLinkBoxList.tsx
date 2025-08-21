import { FC } from "react";
import { ITournament } from "../../../types";
import { GroupLinks } from "../../../shared/components/groupComponents";
import { TournamentLinkBox } from "./tournamentLinkBox";

export const TournamentLinkBoxList: FC<{list: ITournament[]}> = ({ list }) => (
  <GroupLinks>
    {
      list.map( it => (
        <TournamentLinkBox key = { it.id } tournament = { it } />
      ))
    }
  </GroupLinks>
)