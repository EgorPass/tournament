import styled from "styled-components";

interface IStyledTitleGridString {
  $cols?: string, 
  // $pd?: string, 
  $bg?: string, 
  $cr?: string, 
  $bd?: boolean, 
}

export const RubberWrapper = styled.div<IStyledTitleGridString>`
  
  cursor: pointer;
  
  display: grid;
  grid-template-columns: ${(props)=>(props.$cols? props.$cols : "auto")};
  align-items: center;
  
  border-bottom: ${ props => `1px ${ !props.$bd? "none" : "solid" } { props.theme.themeColors.color.secondaryLine } `};

  padding: 9px 0 7px 12px;

  font-size: 18px;
  font-weight: 500;
  
  background-color: ${
    (props)=>( 
      props.$bg ? props.$bg : 
      props.theme.themeColors.color.navLink
    )
  };
  
  color: ${
      (props) => (
        props.$cr ? props.$cr : props.theme.themeColors.fontColor.primal 
      )
    };

  &:hover {
    background-color: ${ (props) => props.theme.themeColors.color.hoverLink };
    color: ${ (props) => props.theme.themeColors.fontColor.hover }
  }

  
    
`;
