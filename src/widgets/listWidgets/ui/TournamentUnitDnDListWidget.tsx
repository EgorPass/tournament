import { suspenseHOCWrapper } from "../../../shared/HOCs/ui/suspenseHOCWrapper"
import { ITournamentUnitData } from "../../../types"
import { DragAndDropLinksFeature, useTournamentUnitDrag } from "../../../features/dragAndDrop"
import { useGetTournamentUnitList } from "../model/useGetTournamentUnitList"
import {  } from "../../../features/dragAndDrop/model/useTournamentUnitDrag"
import { TournamentUnitLinkBox } from "../components/TournamentUnitLinkBox"

export const TournamentUnitDnDListWidget = suspenseHOCWrapper( 
  () => {
    // console.log( "render tournament unit list ......")
    const { units } = useGetTournamentUnitList()
    const { sortAndDragTournamentUnit, saveTournamentList, list } = useTournamentUnitDrag( units )
    return (
      <DragAndDropLinksFeature
        head = "Участники"
        list = { list }
        dataDragName = "unit"
        replaceFunction = { sortAndDragTournamentUnit }
        saveFunction = { saveTournamentList }
        listItem = { ( it: ITournamentUnitData ) => <TournamentUnitLinkBox {...it} /> }
      />
    )
  }
)