import { FC } from "react";
import { IUnit } from "../../../types";
import { HeadForCard } from "../../../shared/components/heads";
import { UnitMainInfo } from "../components/unitMainInfo";
import { getFullUnitName } from "../lib/getFullUnitName";

export const CurrentUnitCardInfo:FC<IUnit> = ( unit ) => (
  <>
    <HeadForCard>
      { getFullUnitName( unit ) } 
    </HeadForCard>
    <UnitMainInfo unit = { unit } type = "unit_list" />
  </>
)
