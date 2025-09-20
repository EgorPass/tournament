import { FC  } from "react";
import { ILevel } from "../../../types";
import { useLevelBased } from "../model/useLevelBased";


export const LevelBasedContainer: FC<ILevel > = ( level ) => {
  const { 
    createLevel, pastLevel, 
    fromLevel, fromDiscipline, 
    fromTournament 
   } = useLevelBased( level )

  return (
    <span>
      { createLevel === "new" && "Первый этап в дисциплине"  }
      { createLevel === "fromPastLevel" && pastLevel! && (
          `На основании результатов предыдущего этапа данной дисциплины: "${ pastLevel?.name }"` )
      }
      {
        createLevel === "fromLevelResult" && !!fromLevel && (
          `на этапе "${ fromLevel.name }", данной дисциплины`)
      }
      {
        createLevel === "fromDisciplineResult" && !!fromDiscipline && !!fromTournament && (
          `На основании результатов дисциплины "${ fromDiscipline.name }" в соревнованиях "${ fromTournament.name }"`
        )
      }
      </span>
  )
}
