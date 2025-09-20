import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { IDiscipline } from "../../../types"
import { useSetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting"
import {  ReactNode, useEffect } from "react"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { TournamentPlayerReitingInfo } from "../../../entities/unit"
import { useCreateCurrentPlayerReiting } from "../model/useCreateCurrentPlayerReiting"
import { CurrentTournamentPlayerReitingResultList } from "../components/CurrentTournamentPlayerReitingResultList"
import {  ResultReitingWrapper, ResultRetingColumns } from "../components/wrapperComponents"
import { LevelWrapperComponent } from "../components/LevelWrapperComponent"

interface IProp {
  discipline_id: string, 
  player_id: string, 
  children?: ReactNode
}


export const PlayerModalReitingContainer = suspenseHOCWrapper(
  ( { discipline_id, player_id, children }: IProp) =>  {

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
            <ResultReitingWrapper>
              {children && children }
              <TournamentPlayerReitingInfo player ={ data.player } >
                <span>в категории: { data.category } { discipline?.categories ==="age" ? "лет": "кг." };</span>
              </TournamentPlayerReitingInfo>
              <ResultRetingColumns 
                $col = { data.levelsData.length } 
                $isTwoCol = { data.levelsData.length <= 2 }
              >
                {
                  data.levelsData.map( levelData => (
                    <LevelWrapperComponent 
                      level_name={ levelData.level_name } 
                      key = { levelData.level_name }
                    >
                      <CurrentTournamentPlayerReitingResultList 
                        levelData={ levelData } 
                      />
                    </LevelWrapperComponent>      
                  ))
                }
              </ResultRetingColumns>  
          </ResultReitingWrapper>

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