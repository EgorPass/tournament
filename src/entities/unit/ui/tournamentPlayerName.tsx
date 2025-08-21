import styled from "styled-components"
import { ITournamentPlayer } from "../../../types"
import { FC } from "react"

const TournamentPlayerNameWrapper = styled.div`
  /* display: flex; */
  /* flex-flow: column; */
  /* align-items: flex-start;
  justify-items: center; */
  
  margin: 0 0 0px 0;
  
  @media (${props => props.theme.media.max}) {
    /* align-items: flex-start; */
    /* margin: 0 0 10px 20px; */
  }
`

export const TournamentPlayerName: FC<ITournamentPlayer> = ( { number, name }) => (
  <TournamentPlayerNameWrapper>
    <span>№{ number }</span><span> { name }</span>
  </TournamentPlayerNameWrapper>
)