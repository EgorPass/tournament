import styled from "styled-components"

export const HeadForLink = styled.h4`
  font-weight: 500;
  padding: 0;
  margin: 0 0 5px 0;
  text-align: center;
  
  & * {
    text-decoration: underline;
    font-weight: 500;
    &:hover{
      color: gray;
    }
  }
`
