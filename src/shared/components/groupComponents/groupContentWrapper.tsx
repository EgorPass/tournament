import styled from "styled-components";

export const GroupContentWrapper = styled.div`
  padding: 10px 10px;
  margin-bottom: 10px;
  border: ${ (props => `1px solid ${props.theme.themeColors.color.secondaryLine }`)};
  border-radius: 5px;
  
  margin-bottom: 10px;
  padding: 15px 15px;

  position: relative;

  &:last-child{
    margin-bottom: 0;
  }
`

