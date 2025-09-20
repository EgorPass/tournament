import styled from "styled-components";



export const DisciplinePlayContentWrapper = styled.div`

  padding: 0;
  margin: 0;

  border: ${ props => `1px solid ${ props.theme.themeColors.color.secondaryLine }`};
  border-top: none;
  border-radius: 0 0 5px 5px ;
  height: calc(100% - 40px);
  width: 100%;
  overflow: hidden;
  
  /* border: 1px dotted black; */

  & > div {
    /* border: none; */
  }

`

export const DisciplinePlayMainScreenWrapper = styled.div`
  color: ${ props => props.theme.themeColors.fontColor.primal };
  width: 100%; //calc(100% - 15px);
  /* padding: 0 8px 0 0; */
  /* position: relative; */
  height: calc(100vh - 91px - 70px - 2px );
  /* border: 1px dotted red; */
  overflow: hidden;
`