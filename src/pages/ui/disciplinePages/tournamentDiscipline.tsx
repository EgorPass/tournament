import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import {  DisciplineInfoBlock } from "../../../entities/discipline"
import { DisciplineHeaderWidget } from "../../../widgets/headerWidgets"
import { DisciplineLevelDnDListWidget, 
  DisciplineUnitListWidget
 } from "../../../widgets/listWidgets"
import { IDiscipline } from "../../../types"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { GameOverDisciplineContainer } from "../../containers/GameOverDisciplineContainer"

const TournametDiscipline = suspenseHOCWrapper( 
  () => {
    // console.log( "render discipline. .... ")
    const { currentNodeId } = useLocationHooks()
    const { data: discipline, isSuccess: disciplineSuccess } = useGetSuspenseStateItem<IDiscipline>("discipline", "id", currentNodeId )

    if( disciplineSuccess ) return (
      <>
        <DisciplineHeaderWidget />

        {
           discipline!.status === "prepare" && (
            <ScrollContainerWrapper className = "drag-content">
              <DisciplineInfoBlock  {...discipline! } />
              <DisciplineLevelDnDListWidget />
              <DisciplineUnitListWidget discipline = { discipline! }/>
            </ScrollContainerWrapper>
           )
        }
          {
            discipline!.status === "gameOver" && (
              <GameOverDisciplineContainer { ...discipline! } />
            )
          }
      </>
    )
    return null
  }
)

export default TournametDiscipline