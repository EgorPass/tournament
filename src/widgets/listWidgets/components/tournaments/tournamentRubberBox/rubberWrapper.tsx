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
  
  border-bottom: 1px ${ (props) => !props.$bd? "none" : "solid" } ${(props) => (
      props.theme.themeColors.bg.nav.border ? 
      props.theme.themeColors.bg.nav.border : "rgba( 0, 0 , 0, .5)"
    )  };
    
  padding: ${ (props)=> props.theme.nav.titleGrid.pd.ph };

  font-size: ${ (props) => props.theme.nav.font.sz.ph || "18px" };
  font-weight: ${(props) => props.theme.nav.font.wg.ph };
  
  background-color: ${
    (props)=>( 
      props.$bg ? props.$bg : 
      props.theme.themeColors.bg.nav.link.phone
    )
  };
  
  color: ${
      (props) => (
        props.$cr ? props.$cr : props.theme.themeColors.font.nav 
      )
    };

  &:hover {
    background-color: ${
      (props) => (
        props.theme.themeColors.bg.nav.hover ?
        props.theme.themeColors.bg.nav.hover : 
        "#F0F0F0"
      )
    };
    color: ${
      (props) => (
        props.theme.themeColors.font.navHover ? 
        props.theme.themeColors.font.navHover : 
        props.theme.themeColors.font.nav
      )
    }
  }

  @media (${(props) => props.theme.media.desc_min}) {
    background-color: ${
      (props)=>( 
        props.$bg ? props.$bg : 
        props.theme.themeColors.bg.nav.link.desctop
      )
    };
    font-size: ${ (props) => props.theme.nav.font.sz.ds  };
    font-weight: ${  (props) => props.theme.nav.font.wg.ds  };

    padding: ${
    (props)=> props.theme.nav.titleGrid.pd.ds };
  }
    
`;
