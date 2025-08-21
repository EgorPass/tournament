import styled from "styled-components";

export const UnitDeclareItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .08);
  /* border-top: 1px solid rgba(0, 0, 0, .08); */
  
  /* margin-right: 15px; */
  width: 308px;

  padding: 5px 0 15px;
  /* border: 1px dotted black; */
  text-align: center;
  grid-template-rows: minmax(60px, auto) 20px auto;
  align-content: start;
  grid-row-gap: 10px;

  & > h5 {
    margin-top: 8px;
    margin-bottom: 10px;
  }

  & > a {
    display: block;
    line-height: 1.4;
  }
  @media (${props => props.theme.media.mid}) {
    &:last-child{
      border-bottom: none;
    }
  }
  
`