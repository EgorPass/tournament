import { FC } from "react";
import { TCategoryFabric } from "../../../types";
import { DisciplineReitingTreeGender } from "./DisciplineReitingTreeGender";
import { ResultReitingWrapper, ResultRetingColumns } from "../components/wrapperComponents";
import { useGetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";
import { PlayerModalReitingContainer } from "./PlayerModalRetingContainer";

interface IProp {
  womenPlayers: TCategoryFabric[]
  menPlayers: TCategoryFabric[]
  discipline_id: string
  // discipline: IDiscipline
}

export const ReitingTree: FC<IProp> = ({ womenPlayers, menPlayers, discipline_id }) => {
  const playerModalReiting = useGetPlayerModalReiting()

 return (
    <>
      {
        playerModalReiting.status ? (
          <PlayerModalReitingContainer { ...playerModalReiting } />
        ): (
          <ResultReitingWrapper>
            <ResultRetingColumns $col = { 2 }>
              {
                <DisciplineReitingTreeGender 
                  gender = "Женский пол"
                  data = { womenPlayers }
                  discipline_id = { discipline_id }
                />
              }
              {
                <DisciplineReitingTreeGender 
                gender = "Мужской пол"
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
