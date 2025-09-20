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
  color: ${ props => props.theme.themeColors.fontColor.primal };

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
  background-color: ${(props) => ( props.theme.themeColors.color.inputField)};
  box-shadow: ${ (props => ` inset 0 4px 4px  ${props.theme.themeColors.color.secondaryLine }`)};
  border: ${ (props => `1px solid ${props.theme.themeColors.color.primalLine }`)};

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
