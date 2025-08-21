import { FC } from "react"
import { TLevelData } from "../lib/types"

export const CurrentTournamentPlayerReitingDqList:FC<{ levelData: TLevelData }> = ({ levelData }) => {

  return (
    <div>
      <h6>Штрафы:</h6>
      {
        levelData.level_dqs.length === 0 ? (
          <span> --- </span>
        )
          : 
        (
          <ul> 
            { 
              levelData.level_dqs.map( (dq, idx) => {
                return (
                  <li key ={ `${ dq }-${idx}` }>{ dq } </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}