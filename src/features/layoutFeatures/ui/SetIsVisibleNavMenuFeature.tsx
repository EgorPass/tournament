import styled from "styled-components"
import { useGetIsVisibleMenu, useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice"

const StyledVisibleNavButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border:  ${ (props => `1px solid ${props.theme.themeColors.color.primalLine}`)};
  box-shadow: ${ (props => `0 4px 4px ${props.theme.themeColors.color.primalLine }`)};

  position: absolute;
  z-index: 1000;
  left: 20px;
  bottom: 65px;

  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;

  background: ${ (props) => props.theme.themeColors.color.primalBg };

  &:active {
    /* left:  */
    bottom: 63px;
    box-shadow: ${ (props => `0 2px 2px ${props.theme.themeColors.color.primalLine}`)};
  }

  @media (${(props) => props.theme.media.desc_min}) {
    display: none;
  };
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