import styled from "styled-components"
import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures"
import { IModalPlayerLayoutConsummer, IPLayLayoutContext } from "../../../../types"
import { GroupContentHead } from "../../../../shared/components/heads"
import { LevelPlayInfo } from "../../../../entities/level"
import { useGetPlayerModalData, useSetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"
import { SingleOrEmptyResultsPlayer } from "../../components/play/tournamentPlayerTitle/SingleOrEmptyResultsPlayer"
import { ReturnPlayersToPosition } from "../../components/play/ReturnPlayersToPosition"
import { useModalPlayLayoutContextConsumer } from "../../../../features/layoutFeatures/model/contextPlayLayoutProvider"
import { PlayersTryDataList } from "../../containers/play/PlayersTryDataList"
import { useEffect } from "react"
import { useForm } from "react-final-form"
import { suspenseHOCWrapper } from "../../../../shared/HOCs"

const TournamentPlayerDataWrapper = styled.div`
  height: 100%;
  overflow: auto;
  top: 10px;
  left: 10px;
  right: 7px;
  padding: 15px ;
  color: ${ props => props.theme.themeColors.fontColor.primal };

`
const ContentWrapper = styled.div`
  overflow: auto;
  padding: 5px 0px;
  /* border: 1px solid blue; */
`

const EmptyResults = styled.div`
  padding: 5px 0 10px 30px;
`

export const DisciplineTournamentPlayerModalData = suspenseHOCWrapper(
  () => {
  console.log( " General render modal form .....")

  const form = useForm()
  const { level } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const { dataToTreeModalForm, players } = useModalPlayLayoutContextConsumer() as IModalPlayerLayoutConsummer
  const { status, gender, category, position, playersId } = useGetPlayerModalData()
  const { setPlayerModalData } = useSetPlayerModalData()

  useEffect( () => {
    return () => {
      console.log( "reset modal form ")
      form.reset()
      console.log( "delete modal form ")
      setPlayerModalData( null )
    }
  }, [] ) 

  if( status && dataToTreeModalForm  )
  return (
    <TournamentPlayerDataWrapper>

      <GroupContentHead>{ level!.name }</GroupContentHead>
      <LevelPlayInfo gender = { gender } category = { category } />

      <ContentWrapper>
        <SingleOrEmptyResultsPlayer 
          players = { players  } 
          nameState = { playersId.length < 2 }  
        />
        {
         dataToTreeModalForm.length > 0 ? (
            <PlayersTryDataList />
          ) : (
            <SingleOrEmptyResultsPlayer 
              players = { players }
              nameState = { playersId.length > 1 }  
            >
              <EmptyResults>На данный момент нет результатов...</EmptyResults>
            </SingleOrEmptyResultsPlayer>
          )
        }
        <ReturnPlayersToPosition position = { position } />
      </ContentWrapper>

    </TournamentPlayerDataWrapper>
  )
  return null
}
)