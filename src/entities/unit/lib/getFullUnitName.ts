import { IUnit } from "../../../types"


export const getFullUnitName = ( unit: IUnit ) => (
  !!unit ? `${unit.lastName} ${unit.firstName} ${unit.secondName}` : ""
)