import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice"
import { NavButtonItem } from "../components/navButtonItem"
import { usePlayActionTournamentButton } from "../model/useButtonsModel/usePlayActionTournamentButton"


export const PlayActionTournamentButtonFeature = suspenseHOCWrapper (
  () => {
    const { mutate, title, status, tournamentUnits } = usePlayActionTournamentButton()
    const { setisVisibleMenu } = useSetIsVisibleMenu()

    console.log( title )

    if( status && tournamentUnits.length > 0 )
      return (
        <NavButtonItem 
          title = { title }
          onclick = { ( e ) => {
            e.preventDefault()
            setisVisibleMenu( false )
            mutate.mutate( )
          } }
        />
      )
    else return null
  }
)