import styled from "styled-components";

export const RotedBox = styled.div<{$isOpen: boolean}>`
position: relative;
transform: rotate( ${ (props) => props.$isOpen ? 180: 90 }deg) ;
transition: all .2s ;
width: 15px;
height: 15px;
display: grid;
align-items: center;
justify-content: center;
cursor: pointer;
`