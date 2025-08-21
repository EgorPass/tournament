import { FC, ReactNode } from "react"
import styled from "styled-components"
import { ITournamentPlayer } from "../../../../../types"
import { TournamentPlayerName } from "../../../../../entities/unit"

const SinglePlayerWrapper = styled.div`
  margin: 0 20px 10px 20px;
  /* border: 1px dotted black; */
`

export const SingleOrEmptyResultsPlayer: FC<{ players: ITournamentPlayer[], children?: ReactNode, nameState?: boolean }> = ({ players, children, nameState = true }) => (
  <>
    {
      players
        .map( player => (
          <SinglePlayerWrapper key = { player.id }>
            { nameState && <TournamentPlayerName {...player!} /> }
            { !!children && children  }
          </SinglePlayerWrapper>
        ) )
    }
  </>
)
