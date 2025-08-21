import { AddUnitButtonFeature } from "../../../features/addRemoveFeatures";
import { useFilterUnitList } from "../../../features/searchFilterFeatures";
import { GroupContentWrapper, GroupLinks } from "../../../shared/components/groupComponents";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { useAddUnitFilterPlayer } from "../model/useAddUnitFilterPlayer";

export const AddToDisciplineUnitListWidget = suspenseHOCWrapper(
   ( { tournament_id, discipline_id } : {
    tournament_id: string, discipline_id: string 
   } ) => {
    
    let unitList = useAddUnitFilterPlayer(  )
    unitList = useFilterUnitList( unitList )

    return(
      <GroupContentWrapper>
        <GroupLinks>
          {
            unitList.map( it => (
              <AddUnitButtonFeature
                key = {it.id }
                unit = { it }
                tournament_id = { tournament_id }
                discipline_id = { discipline_id }
              />
            ))
          }
        </GroupLinks>
      </GroupContentWrapper>
    )
  }
)