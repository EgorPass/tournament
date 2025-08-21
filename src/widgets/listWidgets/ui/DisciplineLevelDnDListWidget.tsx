import { useDisciplineLevelList } from "../model/useDisciplineLevelList";
import { suspenseHOCWrapper } from "../../../shared/HOCs/ui/suspenseHOCWrapper";
import { ILevel } from "../../../types";
import {  } from "../../../features/dragAndDrop/model/useLevelDrag";
import { DragAndDropLinksFeature, useLevelDrag } from "../../../features/dragAndDrop";
import { LevelLinkBox } from "../components/LevelLinkBox";

export const DisciplineLevelDnDListWidget = suspenseHOCWrapper(
  () =>{
    const { levels } = useDisciplineLevelList();
    const { sortAndDragLevel, saveLevelList, list } = useLevelDrag( levels  )
    return (
      <DragAndDropLinksFeature
        head = "Этапы"
        list = { list }
        dataDragName = "unit"
        replaceFunction = { sortAndDragLevel }
        saveFunction = { saveLevelList }
        listItem = { ( it: ILevel ) => <LevelLinkBox {...it} /> }
      />
    )
  }
)