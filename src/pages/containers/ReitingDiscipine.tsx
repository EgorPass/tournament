import { FC } from "react"
import { IDiscipline, ITournamentPlayer } from "../../types"
import { useGetSuspenseStateList } from "../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { PlayReitingTreeContainer } from "../../widgets/resultInfoWidgets/containers/PlayReitingTreeContainer"
import { LevelTreeContainer } from "../../widgets/resultInfoWidgets/containers/LevelTreeContainer"
import { useGetSortListStore } from "../../shared/store/redux/slices/sortSlice"

export const ReitingDiscipline:FC<{discipline: IDiscipline}> = ( { discipline }) => {
  const { data: tournamentPlayers, isSuccess  } = useGetSuspenseStateList<ITournamentPlayer>("tournament_player", "discipline_id", discipline.id )
  const { reiting } = useGetSortListStore()

  if( isSuccess) {
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
          reiting === "levelTree" &&  (
            <LevelTreeContainer
              discipline = { discipline }
              tournamentPlayers = { tournamentPlayers }
            />
          )
        }
      </>
    )
  }
  return null
}