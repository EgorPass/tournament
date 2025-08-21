import { FC } from "react";
import { ITournament } from "../../../types";
import { useFilterTournamentList } from "../../../features/searchFilterFeatures";
import { TournamentEmptyBase } from "../components/tournaments/tournamentsTree/tournamentEmptyBase";
import { TournamentSortByFamily } from "../components/tournaments/tournamentsTree/tournamentSortByFamily";
import { TournamentSortByName } from "../components/tournaments/tournamentsTree/tournamentSortByName";
import { TournamentSortByDate } from "../components/tournaments/tournamentsTree/tournamentSortByDate";
import { useGetSortListStore } from "../../../shared/store/redux/slices/sortSlice";


export const TournamentsPageSortTreeContainer: FC<{tournaments: ITournament[]}> = ({ tournaments }) => {
  console.log( "render sort type container ...")
  const { tournament: sortType } = useGetSortListStore()
  tournaments = useFilterTournamentList( tournaments )

  if( tournaments.length === 0 ) {
    return <TournamentEmptyBase />
  }
  else if( sortType === "family" || sortType === "organizer") {
    return  <TournamentSortByFamily 
              tournaments = { tournaments } 
              sortType = { sortType} 
            />
  }
  else if( sortType === "name") {
    return <TournamentSortByName tournaments = { tournaments } />
  }
  else if( sortType === "date") {
    return <TournamentSortByDate tournaments = { tournaments } />
  }
  else return <></>
}