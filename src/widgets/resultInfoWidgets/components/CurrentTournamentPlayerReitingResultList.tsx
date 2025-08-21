import { FC } from "react"
import { TLevelData } from "../lib/types"


export const CurrentTournamentPlayerReitingResultList:FC<{ levelData: TLevelData }> = ({ levelData }) => {

  return (
    <div>
      <h6>Результаты:</h6>
      <ul>
        {
          levelData.level_results.map( ([tryNumber, subTryList]) => {
            
            return (
              <li key = { `${levelData.level_name}-${tryNumber}` }>
                <h6> попытка - №{ tryNumber } </h6>
                <ul>
                  {
                    subTryList.map( subTry => {

                      return(
                        <li key = { `${ levelData.level_name}-${tryNumber}-${subTry.subTry}` }>
                          <div> 
                            <span>#{ subTry.subTry } - </span>
                            { subTry.result }
                          </div>
                          <div>
                            <div>ошибки:</div>
                            { subTry.errors.map( (error,idx) => {
                              return (
                                <div key = { `${ levelData.level_name}-error-${tryNumber}-${subTry.subTry}-${idx}` }>
                                  <span>{ error.data } - </span>
                                  <span>{ error.desc } </span>
                                </div>
                              )
                            })}
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}