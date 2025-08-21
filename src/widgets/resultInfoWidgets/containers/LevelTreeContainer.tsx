import { useCreateReitingList } from "../model/useCreateReitingList"
import { DisciplineReitingLevelGenderItem } from "./DisciplineReitingLevelGenderItem"
import { ResultReitingWrapper, ResultRetingColumns } from "../components/wrapperComponents"
import { LevelHeader } from "../components/reitingHeaders"
import styled from "styled-components"


const LevelWrapper = styled.div`
/* border: 1px dotted red; */
  &:last-child {
    /* border: 1px dotted red; */
    /* margin-right: 20px; */
  }
`
const LevelGround = styled.div`
/* border: 1px dotted green; */
  
`

export const LevelTreeContainer = () => {
  
  const { data, isSuccess, } = useCreateReitingList()
  if( isSuccess )
  return (
    <ResultReitingWrapper>
      <ResultRetingColumns $col = { data.length }>
        {
          data.map( ({ level, boy, girl }) => (
            <LevelWrapper key = { level.id }>
              <LevelHeader>{ level.name } </LevelHeader>
              <LevelGround>
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
              </LevelGround>
            </LevelWrapper>
          ))
        }
      </ResultRetingColumns>  
    </ResultReitingWrapper>
  )
  else 
  return null
}