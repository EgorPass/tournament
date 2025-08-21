import styled from "styled-components"
import { useGetIsVisibleMenu, useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice"

const StyledVisibleNavButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border:1px solid rgba( 0, 0 ,0 ,.15);
  box-shadow: 0 4px 4px rgba(0, 0, 0, .2);

  position: absolute;
  z-index: 1000;
  left: 20px;
  bottom: 65px;

  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;

  background: #e8e8e8; // ${ (props) => props.theme.themeColors.bg.nav.container.phone };

  &:active {
    /* left:  */
    bottom: 63px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
  }

  @media (${(props) => props.theme.media.desc_min}) {
    display: none;
  };
`

const StyledLineForMenu = styled.div`
  
  border-bottom: 1px solid black;
  /* margin-top: 11px; */
  width: 80%;

`

export const SetVisibleNavMenuFeature = () => {

  const isVisibleMenu = useGetIsVisibleMenu()
  const { setisVisibleMenu } = useSetIsVisibleMenu()

  if( !isVisibleMenu )
  return (
    <StyledVisibleNavButton
      onClick={ (e) => {
        e.preventDefault()
        setisVisibleMenu( !isVisibleMenu )
      }}
    >


      <svg width="25" height="25" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="2" y1="2.5" x2="14" y2="2.5" stroke="black"/>
        <line x1="2" y1="6.5" x2="14" y2="6.5" stroke="black"/>
        <line x1="2" y1="10.5" x2="14" y2="10.5" stroke="black"/>
      </svg>


      {/* <StyledLineForMenu />
      <StyledLineForMenu />
      <StyledLineForMenu /> */}

    </StyledVisibleNavButton>
  )

  return null
}