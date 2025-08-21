import { FC, ReactNode, useState } from "react";
import { StyledTitleGridBox } from "../../../../shared/components/navComponents/styledTitleGridBox";
import { RotedTriangle } from "../../../../shared/components/figures";
import { StyledNavTitle } from "../../../../shared/components/navComponents/styledNavTitle";

interface IRubberBox {
  title: string, 
  children: ReactNode,
  bd?: boolean, 
  isOpened?: boolean
}

export const NavRubberBox: FC<IRubberBox> = ({ 
  title, children, bd = true,  isOpened = false 
}) => {
  const [ isOpen, setOpen ] = useState( isOpened )
  return (
    <>
      <StyledTitleGridBox
        $bd = { bd ? !isOpen : false  }
        $bg = "transparent"
        $cols = "18px auto"
        onClick = { (e) => { e.preventDefault(); setOpen(prev => !prev ) } }
      >
        <RotedTriangle isOpen = {isOpen} />
        <StyledNavTitle>{ title }</StyledNavTitle>
      </StyledTitleGridBox>
      { isOpen && <>{ children }</> }
    </>
  )
}