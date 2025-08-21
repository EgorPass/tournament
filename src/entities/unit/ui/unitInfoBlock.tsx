import { FC, ReactNode } from "react";
import { IUnit } from "../../../types";
import { GroupContentWrapper } from "../../../shared/components/groupComponents";
import { UnitMainInfo } from "../components/unitMainInfo";

interface IUnitInfoBlock {
  unit: IUnit,
  type: "current_unit" | "tournament_unit" | "unit_list",
  children?: ReactNode,
  age?: string,
  weight?: string,
}

export const UnitInfoBlock: FC<IUnitInfoBlock> = ({ unit, type, age, weight, children  }) => (
  <GroupContentWrapper>
    { children }
    <UnitMainInfo 
      unit = { unit! } 
      type = { type }
      age = { age } 
      weight = { weight } 
    />
  </GroupContentWrapper>
)