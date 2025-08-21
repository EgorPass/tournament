import { FC, ReactNode } from "react"
import { ExcludeTypePlayerReiting } from "../../../types"
import { TournamentPlayerName } from "./tournamentPlayerName"

interface IProp {
  player: ExcludeTypePlayerReiting | undefined
  children: ReactNode
}

export const TournamentPlayerReitingInfo: FC<IProp> = ( { player,  children } ) => {

  if( !!player ) {

    return (
      <div>
        <TournamentPlayerName { ...player } />
        <div> 
          <span>
            { player.gender === "boy" ? "Мужской пол" : "Женский пол" }
          </span>
          <span>
            { `возраст: - ${ player!.age }`}
          </span>
          <span>
            { ` вес: - ${ player!.weight }` }
          </span>
          
        </div>
        <div>
          <span>позиция в рейтинге: { player!.levelReiting }</span>
          { children }
        </div>
      </div>

   )
  }
  else return null
}