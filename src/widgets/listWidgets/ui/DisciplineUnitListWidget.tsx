import { FC } from "react";
import { LinksBlock } from "../../../shared/components/groupComponents";
import { ITournamentUnitData } from "../../../types";
import { TournamentUnitLinkBox } from "../components/TournamentUnitLinkBox";

export const DisciplineUnitListWidget: FC<{units: ITournamentUnitData[]}> = ( { units } ) => (
  <LinksBlock head = "Участники">
    {
      units.map( ( it ) => (
        <TournamentUnitLinkBox key = { it.id } { ...it } />
      ))
    }
  </LinksBlock>
)