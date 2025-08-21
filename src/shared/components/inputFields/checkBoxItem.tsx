import { FC, ReactNode } from "react"
import { IDiscipline, ILevel, ITournament,  ITournamentUnit, ITournamentUnitDiscipline, IUnit } from "../../../types"
import { ValueField } from "./ValueField"
import { CheckStyleV } from "../../assets/checkStyleV"
import styled from "styled-components"

const StyledCheckboxAncherBox = styled.div`
  display: none;
  position: absolute;
  left: 2px;
  top: 1px;
`
const CheckboxContainer = styled.label`
  display: grid;
  grid-template-columns: 30px auto;
  align-items: center;
  /* justify-content: start; */
  & > input:checked + div  div {
    display: block;
  }

  & input {
    display: none;
  }
  cursor: pointer;
`
const CheckboxRect = styled.div`
  position: relative ;
  width: 20px;
  height: 20px;
  background-color: #fdfdfd; //${(props) => ( props.theme.themeColors.bg.input.inputBg)};
  box-shadow: inset 0 4px 4px 0 ${(props) => ( props.theme.themeColors.boxShadow.inputTextField)};
  border: 1px solid rgba( 105, 105, 105, .26);
`
const CheckboxAncher = () => (
  <StyledCheckboxAncherBox><CheckStyleV /></StyledCheckboxAncherBox>
)

interface IProp { 
  name: string, 
  value: undefined | string | number | IUnit | ITournament | IDiscipline | ILevel | ITournamentUnit | ITournamentUnitDiscipline
  title?: string, 
  children?: ReactNode
}

export const Checkbox: FC<IProp> = ({name, value, title, children }) => (
  <CheckboxContainer>
    <ValueField 
      name = { name }
      type = "checkbox"
      value = { value }
      valid = { false }
    />
    <CheckboxRect>  <CheckboxAncher />  </CheckboxRect>
    { title && ( <span>{ title }</span> ) }
    { children && ( <span>{ children } </span>)}
  </CheckboxContainer>
)
