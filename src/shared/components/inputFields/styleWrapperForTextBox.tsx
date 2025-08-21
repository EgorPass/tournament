import styled from "styled-components";

export const StyleWrapperForTextBox = styled.div`

  & input,
  & select {
    width: 100%;
    margin: 0;
    padding: 5px 10px;
    font-weight: 400;
    border: 1px solid rgba( 10, 10, 10, .1);
    border-radius: 3px;
    background-color:  #fdfdfd;//${(props) => ( props.theme.themeColors.bg.input.inputBg)};
    box-shadow: inset 0 2px 4px 0 #83818130 ;//${(props) => ( props.theme.themeColors.boxShadow.inputTextField)};

      /* outline: 1px dotted rgba( 105, 105, 105, .6); */

    &::placeholder{
      color: rgba( 100, 100, 100, .5) ;//${ props => ( props.theme.themeColors.font.placeholder)};
      /* color: yellow */
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