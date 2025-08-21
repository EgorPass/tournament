import {  DisciplinePlayDescription } from "../../../entities/discipline"

import { usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { DisciplineBookMarkPlayFeature } from "../../../features/bookMarkFeatures"

import { DisciplinePlayHeaderWidget } from "../../../widgets/headerWidgets"

import { DisciplinePlayReiting } from "../../../widgets/resultInfoWidgets/ui/DisciplinePlayReiting"

import { IPLayLayoutContext } from "../../../types"
import { DisciplinePlayLevelFormWidget } from "../../../widgets/formWidgets"
import { DisciplinePlayContentWrapper, DisciplinePlayMainScreenWrapper } from "../../components/playPageWrappers"
import { useGetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"
import { useGetPlayerModalData } from "../../../shared/store/redux/slices/playerModalData"


const PlayDiscipline = () => {
  // console.log( "3 - play discipline ..... ")
  const { 
    discipline, tournament
   } = usePlayLayoutContextConsumer() as IPLayLayoutContext

      //  const playerModalData = useGetPlayerModalData()

  const bookMark = useGetBookMark()
  if( tournament && discipline )
  return (
    <>
      <DisciplinePlayHeaderWidget />
      <DisciplinePlayMainScreenWrapper>

        <DisciplineBookMarkPlayFeature />
        <DisciplinePlayContentWrapper>
          { bookMark === "info" && <DisciplinePlayDescription /> }
          { bookMark === "play" &&  <DisciplinePlayLevelFormWidget /> }
          { bookMark === 'reiting' && <DisciplinePlayReiting /> }
        </DisciplinePlayContentWrapper>
      </DisciplinePlayMainScreenWrapper>

    </>
  )
  return null
}
export default PlayDiscipline