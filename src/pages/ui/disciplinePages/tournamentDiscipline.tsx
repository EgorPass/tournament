import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import {  DisciplineInfoBlock } from "../../../entities/discipline"
import { useDisciplineData } from "../../model/discipline/useDisciplineData"
import { DisciplineHeaderWidget } from "../../../widgets/headerWidgets"
import { DisciplineLevelDnDListWidget, DisciplineUnitListWidget } from "../../../widgets/listWidgets"
import { IDiscipline } from "../../../types"
import { ReitingTree } from "../../../widgets/resultInfoWidgets"
import styled from "styled-components"
import { useGetDisciplineReitingList } from "../../../widgets/resultInfoWidgets/model/useGetDisciplineReitingList"

const ReitingTreWrapper = styled.div`
  height: auto;
`

const ReitingDiscipine = suspenseHOCWrapper(

  ( { discipline }: { discipline: IDiscipline} ) => {
    
    const { data, isSuccess } = useGetDisciplineReitingList( discipline )

    if( isSuccess ) {
      return (
        <ReitingTree 
          menPlayers = { data.menPlayers } 
          womenPlayers = { data.womenPlayers } 
          discipline_id = { data.discipline_id } 
        />
      )
    } 
    else return null
  }
)

const TournametDiscipline = suspenseHOCWrapper( 
  () => {
    // console.log( "render discipline. .... ")
    const { isSuccess, discipline, units } = useDisciplineData()
    if( isSuccess ) return (
      <>
        <DisciplineHeaderWidget />
        <ScrollContainerWrapper className = "drag-content">
          <DisciplineInfoBlock  {...discipline! } />
          {
            discipline!.status === "prepare" && <DisciplineLevelDnDListWidget />
          }
          {
            discipline!.status === "prepare" && <DisciplineUnitListWidget units = { units }/>
          }
           
          {
            discipline!.status === "gameOver" && (
              <ReitingTreWrapper>
                <ReitingDiscipine  discipline = { discipline! } />
              </ReitingTreWrapper>
            )
          }
        </ScrollContainerWrapper>
       
      </>
    )
    return null
  }
)

export default TournametDiscipline