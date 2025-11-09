import { suspenseHOCWrapper } from "../../../shared/HOCs/ui/suspenseHOCWrapper"
import { LinksBlock, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { useGetSuspenseStateStore } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"
import { IUnit } from "../../../types"
import { UnitsListTree } from "../components/unitListTree"

export const UnitsPageListwWidget = suspenseHOCWrapper( 
  () =>{
    const { data: units } = useGetSuspenseStateStore<IUnit>( "current_unit")
    return (
      <ScrollContainerWrapper>
        <LinksBlock head = { units.length > 0 ? "Список спортсменов" : "" } >
          <UnitsListTree units = { units } />
        </LinksBlock>
      </ScrollContainerWrapper>
    )
  } 
)