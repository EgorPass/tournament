import styled from "styled-components";
import { ScrollContainerWrapper } from "../../shared/components/groupComponents";
import { NavSortTourMenu, NavThemeMenu, NavAdminMenu, NavMainSingleMenuItem, NavActionForPages, NavSortReitingList } from "../../widgets/navWidgets";
import { useGetIsVisibleMenu, useSetIsVisibleMenu } from "../../shared/store/redux/slices/menuSlice";
import { CloseNavMenuFeature } from "../../features/layoutFeatures";
import { FC, ReactNode } from "react";

const StyledOuterListContainer = styled.ul`
  height: 100%;
  user-select: none;    //
  list-style-type: none;    //
  width: 276px;
  padding: 10px 0 10px 0;

  @media (${(props) => props.theme.media.desc_min}) {
    width: 276px;
    padding: 10px 0 10px 0 ;
  }
`;

const StyledNavContainer = styled.nav<{$left?: string, $isVisible: boolean }>`
  /* border: 1px dotted blue; */
  border-right: ${ (props) => `1px solid ${props.theme.themeColors.color.primalLine }` };
  /* overflow: hidden; */
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 999;

  transition: left 150ms ease;

  left: ${  props => props.$isVisible ? "0px" : "-317px" } ; //-317px;
  
  //  сделать медийными и убрать из темы //
  width: 317px;
  padding: 0 6px 0 20px;
  /* padding-top: 40px; */
  //////////////////////////////

  background-color: ${ (props) => props.theme.themeColors.color.primalBg };   

  @media (${(props) => props.theme.media.desc_min}) {
    background-color: ${ (props) => props.theme.themeColors.color.mainBg };   //
    position: static;    
  };

`;

const NavContainer: FC<{ children: ReactNode }> = ( {children} ) => {
  const isVisibleMenu = useGetIsVisibleMenu()

  return (
    <StyledNavContainer $isVisible = { isVisibleMenu }>
      { children } 
    </StyledNavContainer>

  )
}

const Wrapper = styled.div`

height: calc(100% - 70px);
overflow: hidden;
`


const Nav = () => {
  // console.log( "render Nav component...........")
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  return (

    <NavContainer>

      <CloseNavMenuFeature />
      <Wrapper
        onBlur={ (e) => {
          console.log( "blur ....")
                setisVisibleMenu( false )

        }}
      >
      <ScrollContainerWrapper>
        <StyledOuterListContainer 
          onClick={ (e) => {
              const target = e.target as HTMLElement
              // console.dir( target )
              if( target.tagName.toLowerCase() === "a") {
                setisVisibleMenu( false )
              }
          }}
        >

          <NavMainSingleMenuItem />
          <NavSortTourMenu />
          <NavSortReitingList />
          <NavActionForPages />
          <NavAdminMenu />         
          <NavThemeMenu />


        </StyledOuterListContainer>
      </ScrollContainerWrapper>
</Wrapper>
    </NavContainer>
  
  )
}

export default Nav

