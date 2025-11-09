import { FC } from "react"
import { ITournament } from "../../../types"
import { LinkBox } from "../../../shared/components/buttonsAndLinks"
import { TournamentCard } from "../../../entities/tournament"

export const TournamentLinkBox: FC<{tournament: ITournament}> = ({tournament}) => (
  <LinkBox
    to = "/api/view/tournament/check"
    state = {{ 
      from: { id: tournament.id, pathname: "tournament", },
    }}
  >
    <TournamentCard {...tournament } />
</LinkBox>
)