import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ILevel, ITournament } from "../../../types"
import { MainHeader } from "../components/mainHeader"



export const LevelHeaderWidget = suspenseHOCWrapper( 
  () => {
    const { pathnameType, fromId, currentNodeId, titleMod } = useLocationHooks()
    const { data: level } = useGetStateItem<ILevel>( "level", "id", currentNodeId, ( fromId === currentNodeId || pathnameType === "view" ) )
    const discipline_id = ( currentNodeId !== fromId ) ? fromId: !!level? level.discipline_id: ""  
    const { data: discipline } = useGetSuspenseStateItem<IDiscipline>( "discipline", "id", discipline_id )
    const { data: tournament } = useGetSuspenseStateItem<ITournament>("tournament", "id", discipline!.tournament_id, )

    return (
      <MainHeader 
        thirdTitle = { tournament!.name }
        secondTitle = { discipline!.name }
        firstTitle = { `${ pathnameType === "view" ? level!.name : titleMod + "этап" }` } 
      />
    )

  }
)