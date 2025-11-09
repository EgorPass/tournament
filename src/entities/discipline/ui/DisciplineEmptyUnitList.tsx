import { FC } from "react"
import { IDiscipline, ILevel, ITournament } from "../../../types"
import { useDBGetMethods } from "../../../shared/store/offlineDB"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GroupContentWrapper } from "../../../shared/components/groupComponents"
import { DisciplineUnitEmplyListWrapper } from "../compoents/disciplineInfoWrapper"
import styled from "styled-components"
import { suspenseHOCWrapper } from "../../../shared/HOCs"

const Bold = styled.span`
  font-weight: bold;
`

export const DisciplineEmptyUnitList = suspenseHOCWrapper(
  ( { level } : { level: ILevel } ) => {

  //нужно по другому выбирать информацию о дисциплине и соревновании на основе которой это всё проходит 
  // console.log( level )
  const { getItemFromDB } = useDBGetMethods()

  const { data, isSuccess } = useSuspenseQuery({
    queryKey: [ "discipline_unit_fromResult", { "id": level.fromResult.discipline }],
    queryFn: async( ) => {
      
      let tournament: ITournament | undefined

      const discipline = await getItemFromDB<IDiscipline>("discipline", "id", level.fromResult.discipline )

      if( !!discipline ) {  
        tournament = await getItemFromDB<ITournament>("tournament", "id", discipline.tournament_id )
      }
      return { discipline, tournament }
    }
  })

  if( isSuccess ) {

    return (
      <GroupContentWrapper>
        <DisciplineUnitEmplyListWrapper>
          Участники будут выбраны на основе результатов дисциплины <Bold>{ !!data.discipline && data.discipline.name }</Bold> проходящей в соревнованиях <Bold>{ !!data.tournament && data.tournament.name }</Bold>
        </DisciplineUnitEmplyListWrapper>

      </GroupContentWrapper>
    )
  }
  else return null

}
)