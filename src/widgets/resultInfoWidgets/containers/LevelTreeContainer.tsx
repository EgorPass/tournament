import { useCreateReitingList } from "../model/useCreateReitingList"
import { DisciplineReitingLevelGenderItem } from "./DisciplineReitingLevelGenderItem"
import {  ResultReitingWrapper, ResultRetingColumns } from "../components/wrapperComponents"
import { LevelWrapperComponent } from "../components/LevelWrapperComponent"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { IDiscipline, ITournamentPlayer } from "../../../types"
import { FC } from "react"


interface IProp {
  discipline: IDiscipline | undefined
  tournamentPlayers: ITournamentPlayer[]
}

export const LevelTreeContainer:FC<IProp> = suspenseHOCWrapper(
  ({discipline, tournamentPlayers}) => {
  
  const { data, isSuccess, } = useCreateReitingList( discipline, tournamentPlayers )
  
  console.log( data )

  if( isSuccess )
  return (
    <ResultReitingWrapper>
      <ResultRetingColumns $col = { data.length } $isTwoCol = { data.length <= 2 }>
        {
          data.map( ({ level, boy, girl }) => (
            <LevelWrapperComponent level_name={ level.name } key = { level.id }>
              <DisciplineReitingLevelGenderItem
                  gender = "girl"
                  list = { girl }
                  level = { level }
                />
                <DisciplineReitingLevelGenderItem
                  gender = "boy"
                  list = { boy }
                  level = { level }
                /> 
            </LevelWrapperComponent>
          ))
        }
      </ResultRetingColumns>  
    </ResultReitingWrapper>
  )
  else 
  return null
}
)