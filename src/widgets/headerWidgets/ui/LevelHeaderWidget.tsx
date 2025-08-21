import { useGetQueryData } from "../../../shared/hooks/state/useGetQueryData"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ILevel, ITournament } from "../../../types"
import { MainHeader } from "../components/mainHeader"



export const LevelHeaderWidget = () => {
  const getQueryData = useGetQueryData()
  const { pathnameType, fromId, currentNodeId, titleMod } = useLocationHooks()
  const level = getQueryData<ILevel>( "level", "id" )
  const discipline_id = ( currentNodeId !== fromId ) ? fromId: !!level? level.discipline_id: ""  
  const discipline = getQueryData<IDiscipline>( "discipline", "id", discipline_id )
  const tournament = getQueryData<ITournament>("tournament", "id", discipline.tournament_id, )

  return (
    <MainHeader 
      thirdTitle = { tournament!.name }
      secondTitle = { discipline!.name }
      firstTitle = { `${ pathnameType === "view" ? level!.name : titleMod + "этап" }` } 
    />
  )

}