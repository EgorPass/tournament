import { FC } from "react";
import { HeadForCard } from "../../../shared/components/heads";
import { ITournament } from "../../../types";
import { apiDate } from "../../../shared/lib/api/apiDate";


export const TournamentCard: FC<ITournament> = ({name, date}) => (
  <>  
    <HeadForCard>{ name }</HeadForCard>
    <div>{ apiDate.setLocaleDate( date ) }</div>
  </>
)