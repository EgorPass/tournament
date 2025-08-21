import { FC } from "react";
import { TResultState } from "../lib/types";

export const DisciplineReitingPlayerResult: FC<TResultState> = ( result ) => (
  <div>
    {
      result!.data && <span>
        { result!.data }&nbsp;&nbsp;
      </span> 
    }
    {
      result!.qualWins && <span>{`побед - ${ result!.wins }`}</span>
    }
  </div>
)