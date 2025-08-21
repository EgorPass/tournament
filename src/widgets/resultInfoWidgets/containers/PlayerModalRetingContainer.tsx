import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { IDiscipline } from "../../../types"
import { useSetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting"
import { useEffect } from "react"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { TournamentPlayerReitingInfo } from "../../../entities/unit"
import { useCreateCurrentPlayerReiting } from "../model/useCreateCurrentPlayerReiting"
import { CurrentTournamentPlayerReitingDqList } from "../components/CurrentTournamentPlayerReitingDqList"
import { CurrentTournamentPlayerReitingResultList } from "../components/CurrentTournamentPlayerReitingResultList"
 

interface IProp {
  discipline_id: string, 
  player_id: string, 
}

export const PlayerModalReitingContainer = suspenseHOCWrapper(
  ( { discipline_id, player_id }: IProp) =>  {

    // console.log( " reiting container ")
    
    const { data: discipline } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", discipline_id )
    
    const { data, isSuccess} = useCreateCurrentPlayerReiting( discipline_id, player_id )
    
    const { setPlayerModalReiting } = useSetPlayerModalReiting()

    useEffect( () => {
      return () => {
        console.log("reiting modal container remove...")
        setPlayerModalReiting( null)
      }
    }, [])

    // console.log( data )

    if( isSuccess ){

      if( !!data.player && data.category && data.levelsData.length > 0 ) {
          return (
          <>
            <TournamentPlayerReitingInfo player ={ data.player } >
              <span> в категории: { data.category } { discipline?.categories ==="age" ? "лет": "кг." }</span>
            </TournamentPlayerReitingInfo>
              <div>
                {
                  data.levelsData.map( levelData => {
                    return (
                      <div key = { levelData.level_name }>
                        <h5>{ levelData.level_name }</h5>
                        <div>
                          <CurrentTournamentPlayerReitingResultList 
                            levelData={ levelData } 
                          />
                          <CurrentTournamentPlayerReitingDqList                         
                            levelData={ levelData }
                          />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
          </>
        )
      }
      else if( discipline && discipline.status === "prepare"){
        return (
          <div>еще нет результатов для отображения ....</div>
        )
      }
      return null
    }
    else return null
  }
)