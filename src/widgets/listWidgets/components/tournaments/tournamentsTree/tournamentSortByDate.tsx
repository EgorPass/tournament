import { FC, Fragment } from "react";
import { ITournament } from "../../../../../types";
import { sortTournamentByDate } from "../../../lib/sortTournamentByDate";
import { TournamentRubberListItem } from "../tournamentRubberBox/TournamentRubberListItem";

export const TournamentSortByDate: FC<{tournaments: ITournament[]}> = ({tournaments}) => {
  const list = sortTournamentByDate( tournaments )
  return (
    <>
      {
        list.map( ( [ title, tournaments]: [string, ITournament[]], index: number ) => (
          <Fragment key = {  title + "-" + index }>
            {
              tournaments.length > 0 && (
                <TournamentRubberListItem
                  title = { title }
                  index = { index }
                  list = { tournaments }
                  arrow = { false }
                />
              ) 
            }
          </Fragment>
        ))
      
      }
    </>
  )
}