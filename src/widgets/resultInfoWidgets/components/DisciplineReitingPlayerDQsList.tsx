import { FC, ReactNode } from "react";
import { TDqState } from "../lib/types";

interface IProp {
  children: ReactNode
  dqState: TDqState,
  dqList: string[]
}

export const DisciplineReitingPlayerDQsList: FC<IProp> = ({dqState, dqList, children }) =>  (
  <>
    { ( !dqState.status || ( dqState.status && dqState.reiting) ) && children }
    {
      !dqState.status && dqList.map( ( it, index ) => (
        <span key = { `${index}-${ it }`}>{ it }&nbsp;</span>
      ) )
    }
    {
      dqState.status && (
        <div>
          Дисквалификация&nbsp;{ dqState.dq }
        </div>
      )
    }
    
  </>
)
