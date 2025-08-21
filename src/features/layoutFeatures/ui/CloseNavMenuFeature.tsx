import styled from "styled-components"
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice"

const WrapperBox = styled.div`
  margin: 20px 10px 10px 0;
  width: 100px ;
  width: auto;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: end;

  /* border: 1px solid black; */
   @media (${(props) => props.theme.media.desc_min}) {
    display: none;
    
  };
`

const CloseMenuButton = styled.div`
  
  /* position: absolute; */
  /* right: 20px; */
  /* bottom: 20px; */

  /* border: 1px solid gray; */
  
  
  /* border-radius: 10px; */

 

`
export const CloseNavMenuFeature = () => {
  const { setisVisibleMenu } = useSetIsVisibleMenu()
  return (
    <WrapperBox>
    <CloseMenuButton 
      onClick={ (e) => {
        e.preventDefault()
        setisVisibleMenu( false )
      }}
    >
      {/* <svg width="54" height="21" viewBox="0 0 54 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L12.6569 17.0711C13.0474 17.4616 13.6805 17.4616 14.0711 17.0711C14.4616 16.6805 14.4616 16.0474 14.0711 15.6569L8.41421 10L14.0711 4.34315C14.4616 3.95262 14.4616 3.31946 14.0711 2.92893C13.6805 2.53841 13.0474 2.53841 12.6569 2.92893L6.29289 9.29289ZM48 10V9L7 9V10V11L48 11V10Z" fill="black"/>
</svg> */}

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L14.8995 14.8995" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 15L14.8995 5.10051" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      
      </CloseMenuButton>
    </WrapperBox>
  )
}