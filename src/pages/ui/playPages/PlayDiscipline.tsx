
import { usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { DisciplineBookMarkPlayFeature } from "../../../features/bookMarkFeatures"

import { DisciplinePlayHeaderWidget } from "../../../widgets/headerWidgets"

import { DisciplinePlayReiting } from "../../../widgets/resultInfoWidgets/ui/DisciplinePlayReiting"

import { IPLayLayoutContext } from "../../../types"
import { DisciplinePlayLevelFormWidget } from "../../../widgets/formWidgets"
import { DisciplinePlayContentWrapper, DisciplinePlayMainScreenWrapper } from "../../components/playPageWrappers"
import { useGetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"
import { DisciplinePlayInfo } from "../../../entities/discipline"
import { suspenseHOCWrapper } from "../../../shared/HOCs"


const PlayDiscipline = suspenseHOCWrapper(
  () => {
  // console.log( "3 - play discipline ..... ")
    const { discipline, tournament } = usePlayLayoutContextConsumer() as IPLayLayoutContext

    const bookMark = useGetBookMark()
    if( tournament && discipline )
    return (
      <>
        <DisciplinePlayHeaderWidget />
        <DisciplinePlayMainScreenWrapper>

          <DisciplineBookMarkPlayFeature bookMarkSet={ [ "info", "play", "reiting" ] }/>
          <DisciplinePlayContentWrapper>
            { bookMark === "info" && <DisciplinePlayInfo  discipline = { discipline! } /> }
            { bookMark === "play" &&  <DisciplinePlayLevelFormWidget /> }
            { bookMark === 'reiting' && <DisciplinePlayReiting /> }
          </DisciplinePlayContentWrapper>
        </DisciplinePlayMainScreenWrapper>
      </>
    )
    return null
  }
)
export default PlayDiscipline