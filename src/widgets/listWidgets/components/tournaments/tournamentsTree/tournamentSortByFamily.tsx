import { FC } from "react";
import { sortTournamentListByFamily } from "../../../lib/sortTournamentByFamily";
import { ITournament } from "../../../../../types";
// import { TournamentRubberBox } from "../tournamentRubberBox/TournamentRubberBox";
import { TournamentRubberListItem } from "../tournamentRubberBox/TournamentRubberListItem";
import { RubberBox } from "../../generic/RubberBox";

export const TournamentSortByFamily: FC<{tournaments: ITournament[], sortType: string }> = ( { tournaments, sortType }) => {
  const list = sortTournamentListByFamily( tournaments, sortType )
  return (
    <>
      {
        list?.map( ( [ title, {actual, finished, fuckup} ], index ) => (
          <RubberBox
            key = {  title + "-" + index }
            title = { title } 
            bd = { false } 
            isOpened = { true } 
          >
            {
              actual.length > 0 && (
                <TournamentRubberListItem
                  list = { actual }  
                  index = { index } 
                  title = "Актуальные соревнования" 
                />
              )
            }
            {
              finished.length > 0 && (
                <TournamentRubberListItem 
                  index = { index } 
                  list = { finished } 
                  title = "Проведённые соревнования" 
                />
              )
            }
            {
              fuckup.length > 0 && (
                <TournamentRubberListItem 
                  list = { fuckup } 
                  index = { index } 
                  title = "Просроченные соревнования" 
                />
              )
            }
          </RubberBox>
        ))
      }
    </>
  )
}