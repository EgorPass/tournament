import { ScrollContainerWrapper } from "../../../shared/components/groupComponents";
import { useLevelData } from "../../model/level/useLevelData";
import { LevelRulesBlock, LevelSelectionBlock } from "../../../entities/level";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { LevelHeaderWidget } from "../../../widgets/headerWidgets";

const TournamentDisciplineLevel = suspenseHOCWrapper(
  () => {
    const { isSuccess, level } = useLevelData()
    if( isSuccess )
    return (
      <>
        <LevelHeaderWidget />
        <ScrollContainerWrapper>
          <LevelSelectionBlock {...level! } />
          <LevelRulesBlock {...level! } />
        </ScrollContainerWrapper>
      </>
    )
    return null
  }
)
export default TournamentDisciplineLevel