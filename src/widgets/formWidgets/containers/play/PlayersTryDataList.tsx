import { FC, useEffect, useState } from "react";
import { IModalPlayerLayoutConsummer,  IPLayLayoutContext,  ITournamentPlayer, TDataToTreeModalForm } from "../../../../types";
import styled from "styled-components";
import { ModalPlayersFormContainer } from "./ModalPlayersFormContainer";
import { useModalPlayLayoutContextConsumer, usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures/model/contextPlayLayoutProvider";
import { useSubTryPusher, useSubTryRemover } from "../../../../features/formFeatures";
import { SubTryPuhser, TryPusher } from "../../components/play/TryAndSubTryPushers";

const TryBorder = styled.div`
  /* border: 1px dotted black; */
  & h5 {
    text-align: center;
    margin-bottom: 10px;
  }
`
export type TSubTryData = {
  tryAtLevel: number;
  subTry: number;
  tournament_player_id: string;
  player: ITournamentPlayer;
}

export const PlayersTryDataList: FC = ( ) => {
  // console.log( "Players try data list .....")
  const { level } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const { dataToTreeModalForm, resetState } = useModalPlayLayoutContextConsumer() as IModalPlayerLayoutConsummer
  const [ state, setState ] = useState<TDataToTreeModalForm[]>(dataToTreeModalForm)
  const { subTryRemover } = useSubTryRemover( state, setState ) 
  const { tryPusher, subTryPusher } = useSubTryPusher( state, setState )
  
  useEffect( () => { setState( dataToTreeModalForm ) }, [ resetState ] )

  return (
    <>
      {
        state.map( ({tryAtLevel, data}) => (
          <TryBorder key = { `result-${ tryAtLevel }`}>
            <h5>Попытка { tryAtLevel }</h5>
            <ModalPlayersFormContainer
              data = { data }
              tryAtLevel = { tryAtLevel }
              subTryRemover = { subTryRemover }
              />
            {
              level!.try === "circle" && (
                <SubTryPuhser 
                  tryAtLevel = { tryAtLevel }
                  subTryPusher = { subTryPusher }
                />
              ) 
            }
          </TryBorder>
        ))
      }

      <TryPusher tryPusher = { tryPusher } />
    </>
  )
}