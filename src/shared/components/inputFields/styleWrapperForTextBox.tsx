import styled from "styled-components";

export const StyleWrapperForTextBox = styled.div`

  & input,
  & select {
    width: 100%;
    margin: 0;
    padding: 5px 10px;
    font-weight: 400;
    color: ${ props => props.theme.themeColors.fontColor.primal };
    
    border: ${ (props => `1px solid ${props.theme.themeColors.color.primalLine }`)};

    border-radius: 3px;
    background: ${(props) => ( props.theme.themeColors.color.inputField)};
    box-shadow: ${ (props => ` inset 0 4px 4px 0 ${props.theme.themeColors.color.secondaryLine }`)};

      /* outline: 1px dotted rgba( 105, 105, 105, .6); */

    &::placeholder{
      color: ${(props) => ( props.theme.themeColors.fontColor.placeholder )};
      font-weight: 400;
    }

    

  }

  & input[type="number"]::-webkit-outer-spin-button,
  & input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none; // Yeah, yeah everybody write about it
  }

  & input[type='number'],
  & input[type="number"]:hover,
  & input[type="number"]:focus {
      appearance: none;
      -moz-appearance: textfield;
  }
/* 
  & option {
    width: 100%;
  } */
   
`