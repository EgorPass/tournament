import { suspenseHOCWrapper } from "../../shared/HOCs"
import { RedirectToPlayPageFeature } from "../containers/RedirectToPlayPageFeature"
import { useLocationHooks } from "../../shared/hooks/useLocationHook"
import { useGetSuspenseStateItem } from "../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { ITournament } from "../../types"

const TournamentRedirect = suspenseHOCWrapper(
  ()=> {
    console.log( "proccess for tournament ....")
    const { currentNodeId } = useLocationHooks()  
    const { data: tournament, isSuccess } = useGetSuspenseStateItem<ITournament>( "tournament", "id", currentNodeId! )

    if( isSuccess )
    return (
      <RedirectToPlayPageFeature
        to = { "tournament" }
        redirect = { tournament!.status === "play" }
      />
    )
    return null 
  }
)
const TournamentRedirectPage = () => <TournamentRedirect />
export default TournamentRedirectPage