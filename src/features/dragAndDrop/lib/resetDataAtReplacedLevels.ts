import { ILevel } from "../../../types";

export const resetDataAtReplacedLevels = ( level: ILevel, position: string ) : ILevel => {
  const createLevel = position === "0" ? "new" : "fromPastLevel";
  return {
    ...level,
    createLevel,
    fromResult: {
      tournament: "",
      discipline: "",
      level: "",
    }
  }
}
