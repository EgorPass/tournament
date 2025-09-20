import { GroupContentWrapper, ScrollContainerWrapper } from "../../../shared/components/groupComponents";
import { useLevelData } from "../../model/level/useLevelData";
import { LevelRulesBlock, LevelSelectionBlock } from "../../../entities/level";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { LevelHeaderWidget } from "../../../widgets/headerWidgets";
import { GroupContentHead } from "../../../shared/components/heads";
import { LevelrulesWrapper } from "../../components/LevelrulesWrapper";

const TournamentDisciplineLevel = suspenseHOCWrapper(
  () => {
    const { isSuccess, level } = useLevelData()
    if( isSuccess )
    return (
      <>
        <LevelHeaderWidget />
        <ScrollContainerWrapper>
          <LevelrulesWrapper>
            <GroupContentWrapper>
              <GroupContentHead>Отбор для этапа</GroupContentHead>
                <LevelSelectionBlock {...level! } />
            </GroupContentWrapper>
            <GroupContentWrapper>
              <GroupContentHead>Правила этапа</GroupContentHead>
                <LevelRulesBlock {...level! } />
            </GroupContentWrapper>
          </LevelrulesWrapper>
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)
export default TournamentDisciplineLevel