import { useLevelDataCreate } from "../../model/level/useLevelDataCreate"
import { GroupContentWrapper, ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { GroupContentHead } from "../../../shared/components/heads"
import { LevelHeaderWidget } from "../../../widgets/headerWidgets"
import { LevelBaseFormWidget, LevelNameFormWidget, LevelChooseCategoriesFormWidget, LevelChooseUnitFormWidget, LevelSortAndGroupFormWidget, LevelWinConditionFormWidget, LevelTryFormWidget } from "../../../widgets/formWidgets"

const CreateTournametDisciplineLevel = () => {
  console.log( "render create level....")
  const { isSuccess } = useLevelDataCreate()
  if( isSuccess )  
  return (
      <>
        <LevelHeaderWidget />
        <ScrollContainerWrapper>
          <form>

            <LevelNameFormWidget />

            <GroupContentWrapper>
              <GroupContentHead>Отбор для этапа</GroupContentHead>
              <LevelBaseFormWidget />
              <LevelChooseCategoriesFormWidget />
              <LevelChooseUnitFormWidget />
            </GroupContentWrapper>

            <GroupContentWrapper>
              <GroupContentHead>Правила для этапа</GroupContentHead>
              <LevelSortAndGroupFormWidget />
              <LevelWinConditionFormWidget />
              <LevelTryFormWidget />
            </GroupContentWrapper>

          </form>
        </ScrollContainerWrapper> 
      </>
    )
    return null
  } 

  export default CreateTournametDisciplineLevel