import styled from "styled-components";

export const LayoutCoverWrapperWidget = styled.div.attrs<any>((props)=>{
  // let x: number;
  // let m: number;

  // onpointerdown = function (e) {
  //   console.log( "pointer down")
  //   x = Math.abs( e.clientX )

  //   onpointermove = function (e) {
  //     console.log( "двигаем меню")
  //     m = Math.abs( e.clientX )
  //     if( m - x > 100 ) {
  //     }
  //   }
  // }
  // onpointerup = function( ) {
  //   console.log( "pointer up")
  //   // onmousedown = null;
  //   onpointermove = null;
  // }

})`
  background-color: ${
  (props) => (
    props.theme.themeColors.bg.cover ? props.theme.themeColors.bg.cover : "#ffffff"
  )
  } ;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 0 0 0px;

  /* border: 1px dotted black; */

  @media(${props => props.theme.media.large}) {
    /* padding: 10px 0; */
  }
`