import { ReactNode, FC } from "react"
import { LinksBlock } from "../../../shared/components/groupComponents"
import { useDragTools } from "../model/useDragTools"
import { DraggableElement } from "../components/DraggableElement"
import { DropZoneElement } from "../components/DropeZoneElement"
import { ILevel, ITournamentUnitData } from "../../../types"

interface IHocDnD {
  head: string,
  dataDragName: string
  listItem: (props: any ) => ReactNode
  list: ILevel[] | ITournamentUnitData[]
  saveFunction: () => Promise<void>
  replaceFunction: <T>(elem: T) => (dropZone: Element) => boolean
}

export const DragAndDropLinksFeature:FC<IHocDnD> = ({
  head, dataDragName, list, listItem,
  replaceFunction, saveFunction,
  
} ) => {

  const { handleDrag, handleDragEnd, handleDragOver, handleDrasStart, handleDrop, elem } = useDragTools()
  
  return (
    <LinksBlock
      head = { head } 
      groupClassName = "drag-box"
    >
      {
        list.map( ( it ) => (
          <DropZoneElement
            id = {  it.id }
            key = {  it.id }
            data-drag-name = { dataDragName }
            onDrop = { handleDrop }
            onDragOver = { 
              (e) => handleDragOver( e, replaceFunction( elem ) )
            } 
            >
            <DraggableElement
              id = { it.id }
              data-drag-name = { dataDragName }
              onDrag = { handleDrag }
              onDragEnd = { 
                ( e ) => handleDragEnd( e, saveFunction ) 
              }
              onDragStart = { ( e ) => handleDrasStart( e, it ) }
            >
              { listItem( {...it}) }
            </DraggableElement>
          </DropZoneElement>
        ))
      }
    </LinksBlock>

  )
}