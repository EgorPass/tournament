import styled from "styled-components";

export const Header = styled.header`
  padding: 0;
  margin: 5px 5px 10px;
  border-bottom: ${ (props) => `1px solid ${props.theme.themeColors.color.primalLine }` };
  color: ${ props => props.theme.themeColors.fontColor.primal }

`
export const HeadTwo = styled.h2`
  padding: 0;
  font-weight: 700;
  text-align: center;
  margin: 10px auto ;
`
export const HeadThree = styled.h3`
  padding: 0;
  font-weight: 600;
  text-align: center;
  margin: 10px auto;
`