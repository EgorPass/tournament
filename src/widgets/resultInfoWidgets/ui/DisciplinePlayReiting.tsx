import { useGetPlayerModalData } from "../../../shared/store/redux/slices/playerModalData"
import { useGetSortListStore } from "../../../shared/store/redux/slices/sortSlice"
import { DisciplineTournamentPlayerModalData } from "../../formWidgets"
import { LevelTreeContainer } from "../containers/LevelTreeContainer"
import { PlayReitingTreeContainer } from "../containers/PlayReitingTreeContainer"


export const DisciplinePlayReiting = ( ) => {
  const { reiting } = useGetSortListStore()
  const playerModalData = useGetPlayerModalData()

  return (
    <>
      { 
        reiting === "reitingTree" && <PlayReitingTreeContainer /> 
      }
      {
        reiting === "levelTree" && playerModalData.status && <DisciplineTournamentPlayerModalData />
      }

      { reiting === "levelTree" && !playerModalData.status && 
        <LevelTreeContainer />
      }
    </>
  )
}