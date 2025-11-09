import { GroupContentWrapper } from "../../../shared/components/groupComponents"
import { DisciplineUnitEmplyListWrapper } from "../compoents/disciplineInfoWrapper"



export const DisciplineEmptyLevelsForAddUnits = () => {

  return (
    <GroupContentWrapper>

      <DisciplineUnitEmplyListWrapper>
        Необходимо создать хотя бы один этап для того, что бы можно было подключить участников к дисциплине!
      </DisciplineUnitEmplyListWrapper>
    </GroupContentWrapper>
  )
}