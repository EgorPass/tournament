import { FC } from "react";
import { LinkBox } from "../../../shared/components/buttonsAndLinks";
import { ITournamentUnitData } from "../../../types";

export const TournamentUnitLinkBox: FC<ITournamentUnitData> = ({unit, tournamentUnit, range, id}) => (
 
  <LinkBox
    to = "/api/view/tournament_unit"
    state = {{ from: { id, pathname: "tournament_unit" } }}
  >
    <div>

    { tournamentUnit.number }
    &nbsp;{`${unit.lastName} ${unit.firstName} ${unit.secondName}` }
    </div>

    { range && ( <>&nbsp;категория { range }</> ) }
  </LinkBox>
)
