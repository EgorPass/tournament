import { FC, ReactNode } from "react";
import { TDqState } from "../lib/types";
import styled from "styled-components";

interface IProp {
  children: ReactNode
  dqState: TDqState,
  dqList: string[]
}


const DisciplineReitingWrapper = styled.div``

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
