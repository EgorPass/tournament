import { FC } from "react"
import { DisciplineEmptyLevelsForAddUnits, DisciplineEmptyUnitList } from "../../../entities/discipline"
import { UnitSearchFilterFeature } from "../../../features/searchFilterFeatures"
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ILevel, ITournament } from "../../../types"
import { AddHeaderWidget } from "../../../widgets/headerWidgets"
import { AddToDisciplineUnitListWidget } from "../../../widgets/listWidgets"

const AddUntiComponent:FC<{discipline: IDiscipline }> = ( { discipline }) => {
  
  const { data: tournament, isSuccess: tournamentIsSuccess } = useGetSuspenseStateItem<ITournament>("tournament", "id", discipline!.tournament_id )

  if( tournamentIsSuccess ) {
    return (
      <>
        <UnitSearchFilterFeature />
        <ScrollContainerWrapper>
          <AddToDisciplineUnitListWidget 
            discipline_id = { discipline!.id }
            tournament_id = { tournament!.id }
          />
        </ScrollContainerWrapper>
      </>

    )
  }
  else return null
}


const AddUnitAtTournament = suspenseHOCWrapper(
  () => {
    const { fromPathname, fromId } = useLocationHooks();
    const { data: discipline, isSuccess: disciplineIsSuccess } = useGetSuspenseStateItem<IDiscipline>(fromPathname, "id", fromId )
    const { data: levels } = useGetSuspenseStateList<ILevel>( "level", "discipline_id", fromId! ) 
    const firstLevel = levels.sort( (x, y ) => +x.levelPosition - +x.levelPosition )[0]

    if( disciplineIsSuccess )
    return (
      <> 
        <AddHeaderWidget />
        {
          !!firstLevel ? (
            firstLevel.createLevel === "fromDisciplineResult" ? (
                <DisciplineEmptyUnitList level = { firstLevel }/>
              ) : ( 
                <AddUntiComponent discipline = { discipline! } />
              )

          ) : (
            <DisciplineEmptyLevelsForAddUnits />
          )
        }
     
      </>
    )
    return null 

  }
)

export default AddUnitAtTournament