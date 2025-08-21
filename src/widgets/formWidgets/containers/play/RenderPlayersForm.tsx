import { FC, useEffect, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { useForm, useFormState } from "react-final-form"
import { TournamentPlayerName } from "../../../../entities/unit"
import { TournamentPlayerDnsTitle } from "../../components/play/tournamentPlayerTitle/TournamentPlayerDnsTitle"
import { UnitTitleWrapper } from "../../components/play/Wrappers"
import { PlayerFormContainer } from "./PlayerFormContainer"
import { ExcludeTypePlayerReiting,  } from "../../../../types"
import { useGetPlayerModalData } from "../../../../shared/store/redux/slices/playerModalData"

export const RenderPlayersForm: FC<{playersData :ExcludeTypePlayerReiting[], playersInGame: string[] }> = ({ playersData, playersInGame }) => {
  console.log( "5 - render players form ....")
  
  const form = useForm()
  const [ state, setState ] = useState({})
  const playerModalData = useGetPlayerModalData()
  
  useEffect( () => { 
    // console.log( "in use Effect ")
    form.change( "onStart", playersInGame )
    form.change( 
      `results`, 
      Object.fromEntries( 
        playersInGame.map( id => ( [ id, { errors: [] } ] ) ) 
      ) 
    )
    return ()=> {  form.reset() }
  } )

  useEffect( () => {
    setState({})
  }, [ playerModalData, playerModalData.status  ]) 

  return (
    <>
      {
        playersData.map( player => (
          <Fragment key = { player.id  }>
            {
              !player.levelStatus.startsWith("DQ") && (
                <>
                  <TournamentPlayerDnsTitle {...player } />
                  <PlayerFormContainer id = { player.id } />
                </>
              ) 
            }
            {
              player.levelStatus.startsWith("DQ") && (
                <>
                  <UnitTitleWrapper>
                    <span></span>
                    <TournamentPlayerName {...player} />
                  </UnitTitleWrapper>
                  <div>
                    Участник дисквалифицирован: 
                    { player.levelStatus }
                  </div>
                </>
              )
            } 
          </Fragment>
        ))
      }
    </>
  )
}