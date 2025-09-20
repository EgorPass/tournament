import { FC, ReactNode } from "react"
import { ExcludeTypePlayerReiting } from "../../../types"
import { TournamentPlayerName } from "./tournamentPlayerName"
import styled from "styled-components"
import { StyledGridAreaItem } from "../../../shared/components/groupComponents"

interface IProp {
  player: ExcludeTypePlayerReiting | undefined
  children: ReactNode
}


const TournamentPlayerReitingInfoWrapper = styled.div`
  display: grid;

  grid-template-areas: "player-name"
                        "player-data" 

                        "player-reiting"
                        ;
  justify-content: center;
  justify-items: center;
  grid-row-gap: 5px;
 
  /* border: 1px dotted red; */
  padding: 5px 0 10px;

`

const ReitingInfo = styled.div`
  
  display: flex;

  flex-flow: column nowrap;
  align-items: center;

  @media (${props => props.theme.media.max}) {
    flex-direction: row;
    justify-items: center;
  }
`

export const TournamentPlayerReitingInfo: FC<IProp> = ( { player,  children } ) => {

  if( !!player ) {

    const isReiting = !!player.levelReiting

    return (
      <TournamentPlayerReitingInfoWrapper>
        
        <StyledGridAreaItem $gridArea="player-name" >
          <TournamentPlayerName { ...player } />
        </StyledGridAreaItem>
        
        <StyledGridAreaItem $gridArea = "player-data">
          <span>{ player.gender === "boy" ? "Мужской" : "Женский" } пол</span>
          <span>;&nbsp;&nbsp;</span>
          <span>{ `вес: - ${ player!.weight }` }</span>
          <span>;&nbsp;&nbsp;</span>
          <span>{ `возраст: - ${ player!.age }`};</span>
        </StyledGridAreaItem>
       
        <StyledGridAreaItem $gridArea = "player-reiting">
          <ReitingInfo>
            <div>
              место в рейтинге: { isReiting ? player.levelReiting : player.levelStatus.startsWith("DQ") ? player.levelStatus : " " };&nbsp;
            </div>
            { children }
          </ReitingInfo>
        </StyledGridAreaItem>
      </TournamentPlayerReitingInfoWrapper>

   )
  }
  else return null
}