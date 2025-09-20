import { FC } from "react";
import { useField } from "react-final-form";
import { ValidationError } from "./validatorError";
import { RenderFiled } from "./RenderField";
import styled from "styled-components";

const DateItemContainer = styled.label`
  display: grid;
  grid-template-columns: 125px 20px;
  grid-template-areas: "groupField inputField";
  justify-content: center;
  padding: 5px 20px;

  overflow: hidden;
  
  div {
    color: ${ props => props.theme.themeColors.fontColor.primal };
  }
  
  span {
    font-weight: 500;
  }

  input {
    width: 20px;
    background-color: ${ props => props.theme.themeColors.color.primalBg };
    border: none;
    box-shadow: none;
    grid-area: inputField;
    outline: none;
    color: ${ props => props.theme.themeColors.fontColor.primal };

  }

  @media (${props => props.theme.media.max}) {
    justify-content: start;
  }
`
export const InputDate: FC<{ name: string, valid?: boolean}> = ( { name, valid = true}) => {
  const field = useField( name )
  const arr = field.input.value.split("-").reverse();
  return (
    <> 
      <ValidationError name = { name } />
      <DateItemContainer >
        <RenderFiled
          name = { name }
          valid = { valid }
          render = { ({input, meta}) => ( <input { ...input } type = "date" /> ) }
        />
        <div>
          <span>
            {`${( arr[ 0 ] ? arr[ 0 ]: "  __  " )}`}
          </span>
            &nbsp;/&nbsp;
          <span>
            {`${( arr[ 1 ] ? arr[ 1 ]: "  __  " )}`}
          </span>
            &nbsp;/&nbsp;
          <span>
            {`${( arr[ 2 ] ? arr[ 2 ]: "  ____  " )}`}
          </span>
        </div>
      </DateItemContainer>
    </>
  )
}