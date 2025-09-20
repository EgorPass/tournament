import { usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { useGetPlayerModalData } from "../../../shared/store/redux/slices/playerModalData"
import { useGetSortListStore } from "../../../shared/store/redux/slices/sortSlice"
import { IPLayLayoutContext } from "../../../types"
import { DisciplineTournamentPlayerModalData } from "../../formWidgets"
import { LevelTreeContainer } from "../containers/LevelTreeContainer"
import { PlayReitingTreeContainer } from "../containers/PlayReitingTreeContainer"


export const DisciplinePlayReiting = ( ) => {
  const { reiting } = useGetSortListStore()
  const playerModalData = useGetPlayerModalData()
  const { tournamentPlayers , discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext

  if( !!discipline ) {

    return (
        <>
        { 
          reiting === "reitingTree" && (
            <PlayReitingTreeContainer 
              discipline = { discipline }
              tournamentPlayers = { tournamentPlayers }
            />
          ) 
        }
        {
          reiting === "levelTree" && playerModalData.status && <DisciplineTournamentPlayerModalData />
        }
        { 
          reiting === "levelTree" && !playerModalData.status &&  (
            <LevelTreeContainer 
              discipline = { discipline }
              tournamentPlayers = { tournamentPlayers }
            />
          )
        }
      </>
    )
  }
  else return null
}