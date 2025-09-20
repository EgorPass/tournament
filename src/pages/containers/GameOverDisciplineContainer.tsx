import { FC } from "react"
import { IDiscipline } from "../../types"
import { DisciplinePlayInfo } from "../../entities/discipline"
import { DisciplineBookMarkPlayFeature } from "../../features/bookMarkFeatures"
import { DisciplinePlayMainScreenWrapper, DisciplinePlayContentWrapper } from "../components/playPageWrappers"
import { useGetBookMark } from "../../shared/store/redux/slices/bookMarkSlice"
import {  ReitingDiscipline } from "./ReitingDiscipine"

export const GameOverDisciplineContainer: FC<IDiscipline> = ( discipline ) => {
  const bookMark = useGetBookMark()
  return (
    <DisciplinePlayMainScreenWrapper>
      <DisciplineBookMarkPlayFeature bookMarkSet={[ "info", "reiting" ]} />
      <DisciplinePlayContentWrapper>
        { bookMark === "info" && (
            <DisciplinePlayInfo  discipline = { discipline! } /> 
          ) 
        }
        { bookMark === 'reiting' && (
            <ReitingDiscipline discipline = { discipline! } />
          )
        }
      </DisciplinePlayContentWrapper>
    </DisciplinePlayMainScreenWrapper>
  )
}