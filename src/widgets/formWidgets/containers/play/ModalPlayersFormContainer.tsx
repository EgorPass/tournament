import { FC } from "react";
import { IModalPlayerLayoutConsummer, IPLayLayoutContext } from "../../../../types";
import styled from "styled-components";
import { useCheckDQFrorPlayersModalForm } from "../../model/play/useModalPlayersFormContainer";
import { PlayerFormFields } from "./PlayFormFields";
import { useGetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData";
import { TournamentPlayerName } from "../../../../entities/unit";
import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures";
import { useModalPlayLayoutContextConsumer } from "../../../../features/layoutFeatures/model/contextPlayLayoutProvider";
import { RemoveRowItemButton } from "../../../../shared/components/buttonsAndLinks";
import { TSubTryData } from "./PlayersTryDataList";

const SubTryWrapper = styled.div`
  
  min-height: 10px;
  /* border: 1px solid red; */
  /* margin: 5px 10px 15px; */
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, .05);
  border-radius: 5px 10px 0 0 ;
  position: relative;
`

const SubTryRemover = styled.button`
  position: absolute;
  top: 5px;
  right: 5px ;
  border: none;
  background: transparent;
`

const PlayerSubTryBorder = styled.div`
  /* border: 1px dotted green; */
  min-height: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  margin: 10px 0 0;
`
const PayerDq = styled.div`
  padding: 5px 0 10px 30px;
`

interface IProp {
  data: TSubTryData[][]
  tryAtLevel: number
  subTryRemover: (tryAtLevel: number, subTry: number) => void
}

export const ModalPlayersFormContainer: FC<IProp> = ({data, tryAtLevel, subTryRemover  }) => {
  // console.log( "modal render tree ......")
  const { playersId } = useGetPlayerModalData()
  const { discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const { dqsList, pastLevelDqs } = useModalPlayLayoutContextConsumer() as IModalPlayerLayoutConsummer
  const stopData = useCheckDQFrorPlayersModalForm( pastLevelDqs, dqsList, playersId, )

  return (
    <>
      {
        data.map( ( items, index ) => (
          <SubTryWrapper 
            key = {`empty-box-result-${ tryAtLevel }-${ index }`}
          >
            <SubTryRemover>
              <RemoveRowItemButton
                handleClick={ (e) => {
                  const subTryNumber = items.flat().map( it => it.subTry )[0]
                  subTryRemover( tryAtLevel, subTryNumber ) 
                }}
              />
            </SubTryRemover>
          {
            items.map( ( subTry ) => (
              <PlayerSubTryBorder 
                key = {`result-for-${ subTry.tournament_player_id}-${ tryAtLevel }-${ subTry.subTry }`}
              >
               
                { 
                  ( playersId.length >= 2 ) 
                    ? <TournamentPlayerName { ...subTry.player! } />
                    : null
                }
                {
                  (
                    !( subTry.tournament_player_id in stopData ) || 
                    ( 
                      ( subTry.tournament_player_id in stopData ) && (
                        ( tryAtLevel <= stopData[subTry.tournament_player_id].tryAtLevel ) && 
                        ( subTry.subTry <= stopData[ subTry.tournament_player_id].subTry ) 
                      ) 
                    ) 
                  ) 
                  ? (
                    <PlayerFormFields
                        id = { subTry.tournament_player_id }
                        idx = { `result-${tryAtLevel}-${ subTry.subTry }`}
                        condition = { discipline!.condition }
                        dqList = { dqsList }
                      />
                  )
                  : (
                    <PayerDq>
                      DQ - { stopData[subTry.tournament_player_id].name } 
                      <span> { stopData[subTry.tournament_player_id].description } </span>
                    </PayerDq>
                  )
                  
                }
              </PlayerSubTryBorder>
            ))
          }
          </SubTryWrapper>
        ))
      }
    </>
  )
}