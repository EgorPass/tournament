import { LinksBlock } from "../../../../shared/components/groupComponents"
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem"
import { suspenseHOCWrapper } from "../../../../shared/HOCs"
import { useGetDisciplineListTourUnitFromUnit } from "../../model/tournamentUnit/useGetDisciplineListTourUnitFromUnit"

export const TournamentUnitChooseDisciplineFromWidget = suspenseHOCWrapper(
  () => {
    const { disciplineList } = useGetDisciplineListTourUnitFromUnit()
    return (
      <LinksBlock head="Заявленные дисциплины">

          {
            disciplineList?.map( it => (
              <Checkbox
              key = { it.data.id } 
                  name = "list"
                  value = { it.data }
                  title = { it.title }
                />
            ))
          }
      </LinksBlock>
    )
  }
)