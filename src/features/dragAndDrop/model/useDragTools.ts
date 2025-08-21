import { DragEvent, useState,  } from "react";

import { useQueryClient } from "@tanstack/react-query"

export const useDragTools = () => {

  const queryClient = useQueryClient()
  const [ elem, setElem ] = useState< any >( null )
  const [dragHtmlElem, setDragHtmlElem ] = useState<HTMLElement | null>(null)

  const [ mouseCoords, setMouseCoords ] = useState<{x: number, y: number, shiftX: number, shiftY: number } | null>( null )

  const scw = document.getElementsByClassName("drag-content")[0] as HTMLDivElement
  const dragBox = document.getElementsByClassName("drag-box")[0] as HTMLDivElement

  const handleDrasStart = ( e: DragEvent<HTMLDivElement>, data: any 
  ) => {
    const { clientX, clientY } = e
    const target = e.target as HTMLElement
    const targetCoords = target.getBoundingClientRect()
    const shiftX = clientX - targetCoords.x
    const shiftY = clientY - targetCoords.y
    const crt = target.cloneNode( true ) as HTMLElement
          crt.style.display = "none"

      e.dataTransfer.setDragImage( crt, 308 , 45 )
      e.dataTransfer.effectAllowed = "move"

      target.classList.add("drag")
      target.style.top = clientY  + "px"
      target.style.left = clientX - shiftX + "px"

    setElem( data )
    setDragHtmlElem( target )
    setMouseCoords( ( { shiftX, shiftY,  x: clientX, y: clientY, } ) )
  }

  const handleDrag = ( e: DragEvent<HTMLDivElement> ) => {
    e.preventDefault();
    if( dragHtmlElem && mouseCoords ) {
      const { clientX, clientY } = e
      let x = clientX - mouseCoords.shiftX
      let y = clientY - mouseCoords.shiftY
      
      const top = clientY - mouseCoords.shiftY
      const left = clientX - mouseCoords.shiftX
      const right = left + dragHtmlElem.offsetWidth
      const bottom = top + dragHtmlElem.offsetHeight
      const dragBoxCoords = dragBox.getBoundingClientRect()
      
      if( left < dragBoxCoords.left ) 
        x = dragBoxCoords.left
      if( top < dragBoxCoords.top )
        y = dragBoxCoords.top
      if( right > dragBoxCoords.right ) 
        x = dragBoxCoords.right - dragHtmlElem.offsetWidth
      if( bottom > dragBoxCoords.bottom ) 
        y = dragBoxCoords.bottom - dragHtmlElem.offsetHeight
      
      dragHtmlElem!.style.left = x + "px" 
      dragHtmlElem!.style.top = y + "px"
      
      const scwCoords = scw.getBoundingClientRect()
      
      if( top < scwCoords.top ) {
        let scroll = Math.max( -clientY, 10 )
        if( scroll < 0 ) scroll = 0;

        scw.scrollBy( 0, scroll * -1 )
      }
      if( bottom > scwCoords.bottom ) {
        let scroll = Math.min( bottom - scwCoords.bottom, 10 )
        if( scroll < 0 ) scroll = 0

        scw.scrollBy( 0 , scroll )
      }
    }
  }

  const handleDragOver = ( e: DragEvent<HTMLDivElement>, replaceElement: (dropZone: Element) => boolean ) => {
    e.preventDefault()

    const overTarget = e.target as HTMLElement
      if( 
        !overTarget 
        || !mouseCoords 
        || !dragHtmlElem 
        || !elem 
      ) return
    
    const dropZone = overTarget.closest("[data-type = drop-zone]") as HTMLDivElement
      if( 
        !dropZone 
        || (  dropZone.id === dragHtmlElem.id ) 
        || ( dropZone.dataset.dragName !== dragHtmlElem.dataset.dragName )
      ) return 

    const cool = replaceElement( dropZone )
      if( !cool ) return  

    const newCoords = overTarget.getBoundingClientRect()
    const coords = {
      ...mouseCoords,
      x: newCoords.x, y: newCoords.y
    }
    setMouseCoords( coords )
  }

  const handleDrop = ( e: DragEvent<HTMLDivElement> ) => {
    e.preventDefault();
    dragHtmlElem!.style.display = "none"
  }

  const handleDragEnd = async ( e: DragEvent<HTMLDivElement>, save: ()=> Promise<void> ) => {
    e.preventDefault();

    dragHtmlElem!.classList.remove("drag")
    dragHtmlElem!.removeAttribute("style")
    
    setElem( null )
    setMouseCoords( null )
    setDragHtmlElem( null )
    
    await save()
    await queryClient.invalidateQueries()
  }

  return {
    elem,
    handleDrasStart,  handleDragOver, 
    handleDrag, handleDrop, handleDragEnd, 
  }

}