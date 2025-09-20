import { FC, ReactNode } from "react";
import { TCategoryFabric } from "../../../types";
import { DisciplineReitingTreeGender } from "./DisciplineReitingTreeGender";
import { ResultReitingWrapper, ResultRetingColumns } from "../components/wrapperComponents";
import { useGetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";
import { PlayerModalReitingContainer } from "./PlayerModalRetingContainer";

interface IProp {
  womenPlayers: TCategoryFabric[]
  menPlayers: TCategoryFabric[]
  discipline_id: string
  children?: ReactNode
  // discipline: IDiscipline
}

export const ReitingTree: FC<IProp> = ({ womenPlayers, menPlayers, discipline_id, children  }) => {
  const playerModalReiting = useGetPlayerModalReiting()

 return (
    <>
      {
        playerModalReiting.status ? (
          <PlayerModalReitingContainer { ...playerModalReiting } >
            { children }
          </PlayerModalReitingContainer>
        ): (
          <ResultReitingWrapper>
            { children && children }
            <ResultRetingColumns $col = { 2 } $isTwoCol = { true }>
              {
                <DisciplineReitingTreeGender 
                  gender = "girl"
                  data = { womenPlayers }
                  discipline_id = { discipline_id }
                />
              }
              {
                <DisciplineReitingTreeGender 
                gender = "boy"
                data = { menPlayers }
                discipline_id = { discipline_id }
                />
              }
            </ResultRetingColumns>
          </ResultReitingWrapper>
        )
      }
    </>
  )
}
