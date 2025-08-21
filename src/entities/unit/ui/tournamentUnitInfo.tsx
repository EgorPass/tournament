import { FC } from "react";
import { ITournamentUnit, IUnit } from "../../../types";
import { UnitInfoBlock } from "./unitInfoBlock";
import { HeadForLink } from "../../../shared/components/heads";
import { LinkTitle } from "../../../shared/components/buttonsAndLinks";
import { getFullUnitName } from "../lib/getFullUnitName";

export const TournamentUnitInfo: FC<{tournamentUnit:ITournamentUnit, unit: IUnit}> = ({tournamentUnit, unit }) => (
  <UnitInfoBlock 
    unit = { unit! }
    type = "tournament_unit" 
    age = { tournamentUnit?.age } 
    weight = { tournamentUnit?.weight } 
  >
    <HeadForLink>
      <LinkTitle
         to = "/api/view/current_unit"
         state = {{ from: { id: unit?.id,  pathname: "current_unit", } }}
      >
        { getFullUnitName( unit ) }
      </LinkTitle>
    </HeadForLink>
  </UnitInfoBlock>      
)