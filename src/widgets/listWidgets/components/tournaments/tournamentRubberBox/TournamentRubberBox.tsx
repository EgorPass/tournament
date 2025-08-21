import { FC, ReactNode, useState } from "react";
import { RotedArrow, RotedTriangle } from "../../../../../shared/components/figures";
import { RubberWrapper } from "./rubberWrapper";
import { RubberTitle } from "./rubberTitle";

interface IRubberBox {
  title: string, 
  children: ReactNode,
  bd?: boolean, 
  arrow?: boolean, 
  isOpened?: boolean
}

export const TournamentRubberBox: FC<IRubberBox> = ({ 
  title, children, 
  bd = true, arrow = false, isOpened = false 
}) => {
  const [ isOpen, setOpen ] = useState( isOpened )
  return (
    <>
      <RubberWrapper
        $bd = { bd ? !isOpen : false  }
        $bg = "transparent"
        $cols = "18px auto"
        onClick = { (e) => { e.preventDefault(); setOpen(prev => !prev ) } }
        data-group = "rubber-box"
      >
        { arrow ? <RotedArrow isOpen = {isOpen} /> : <RotedTriangle isOpen = {isOpen} /> }
        <RubberTitle>{ title }</RubberTitle>
      </RubberWrapper>
      { isOpen && <>{ children }</> }
    </>
  )
}