import styled from "styled-components";

export const StyledInnerListContainer = styled.ul`
  width: auto;    //
  height: 100%;   //
  list-style-type: none;  //

  padding: ${ (props)=> props.theme.nav.innerLists.pd.ph };

  @media (${(props) => props.theme.media.desc_min}) {
    padding: ${ (props) => props.theme.nav.innerLists.pd.ds } ;
  }

`;