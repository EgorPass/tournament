import { FC } from "react";
import { ILevel } from "../../../types";
import { levelTranslate } from "../../../shared/lib/translater/levelTranslater";

export const LevelRulesBlock:FC<ILevel> = (level)=> (
  <>
    <div>
      Для победы или отбора в следующий этап необходимо 
        
      { level.win.condition === "bestTry" && " показать лучший результат из числа попыток в общем зачёте." }
      { level.win.condition === "argTry" && " показать лучшее среднее значение результатов попыток в общем зачёте." }
      {
        level.win.condition === "roundWinner" && (
          <>
            &nbsp;выиграть соперника
            { level.win.roundWinner === "bestTry" && " показав лучший результат из числа попыток." }
            { level.win.roundWinner === "argTry" && " показав лучшее среднее значение результатов попыток." }
            { level.win.roundWinner === "qualWin" && <> в {level.win.qual } попытах.</> }

          </>
        )
      }
    </div>
    <div>

      <span>
        Участники выступают { level.sort?.type === "group" ? (
          <>группами по { level.sort?.qual } чел. </>
        ) : "по одиночке " }
        </span>  
      <span>
        {
          level.sort?.type === "group" ? (<>, сопаставленных {levelTranslate[level.sort?.versus]}</>) : ( <>{ levelTranslate[ level.sort?.versus] }</>)
        }
      </span>
    </div>
    <div>
      <div>
        Попытки используятся { level.try === "circle" ? "через круг": "сразу" }
      </div>
    </div>
    </>
)