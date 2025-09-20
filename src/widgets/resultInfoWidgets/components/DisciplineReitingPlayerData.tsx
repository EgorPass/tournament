import { FC } from "react";
import { DisciplineReitingPlayerResult } from "./DisciplineReitingPlayerResult";
import { DisciplineReitingPlayerDQsList } from "./DisciplineReitingPlayerDQsList";
import { TReitingPlayerData } from "../lib/types";
import { PlayerGround, Title } from "./wrapperComponents";



export const DisciplineReitingPlayerData: FC<TReitingPlayerData> = ({name, dqList, dqState, resultState }) =>  (
  <>
    <Title>{ name }</Title>
    <DisciplineReitingPlayerDQsList dqList = { dqList } dqState = { dqState } >
      {
        resultState !== null ? (
          <DisciplineReitingPlayerResult { ...resultState } /> 
        ) : null
      }
    </DisciplineReitingPlayerDQsList>
  </>
)
