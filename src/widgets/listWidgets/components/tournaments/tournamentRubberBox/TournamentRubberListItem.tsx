import { FC } from "react"
import styled from "styled-components"
import { ITournament } from "../../../../../types"
import { TournamentRubberBox } from "./TournamentRubberBox"
import { TournamentLinkBoxList } from "../../tournamentLinkBoxList"


const StyledTournamentListItem = styled.div`
  & > div:nth-child(2) {
    /* padding-left: 0px; */
  }
 `

export const TournamentRubberListItem: FC<{
  title: string, 
  index: number, 
  list: ITournament[],
  arrow?: boolean
}> = ({title, index, list, arrow = true }) => (
  <StyledTournamentListItem>
    <TournamentRubberBox
      title = { title }
      bd = { false }
      arrow = { arrow }
      isOpened = { index < 1 }
    >
      <TournamentLinkBoxList list={ list } />
    </TournamentRubberBox>
  </StyledTournamentListItem>
)