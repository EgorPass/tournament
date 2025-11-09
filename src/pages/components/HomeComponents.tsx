import styled from "styled-components";
import { ScrollContainerWrapper } from "../../shared/components/groupComponents";

export const HomeParagraph = styled.p`
  text-indent: 40px;
  margin-bottom: 10px;

  &:last-child{
    min-height: 80vh;
  }
`
export const Main = styled( ScrollContainerWrapper )`
  height: 100%;
  height: calc( 100% - 60px);
  padding: 0 20px;
` 

export const Wrapper = styled.div`
  height: 100%;
  height: calc(100% + 70px);
  overflow: hidden;
`

export const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

export const UnOderList = styled.ul<{$type?: boolean}>`
   list-style-type: ${ (props) => props.$type ? "disc" : "none" };


  margin-left: 20px; //${ ({$type}) => $type ? "40px" :  "20px"};
  padding:${ ({$type}) => $type ? "0 0 0 40px" :  "0 0 0 20px"};;
  margin-top: 10px;
  margin-bottom: 20px;
`

export const ListItem = styled.li`
  text-indent: 0;
  
  margin: 0 0 5px 0;
`

export const Anchor = styled.a.attrs<{ href: string}>( ( props) => ({
  // id: props.id,
  href: `#${props.href}`
}))`
  color: blue;
  text-decoration: none;
  cursor: pointer;
`

export const Italic = styled.em`
  font-style: italic;
`