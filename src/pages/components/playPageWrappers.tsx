import styled from "styled-components";



export const DisciplinePlayContentWrapper = styled.div`

  padding: 0;
  margin: 0;

  border: 1px solid rgba(0, 0, 0, 1);
  border: 1px solid rgba(0, 0, 0, .03);
  border-top: none;
  border-radius: 0 0 5px 5px ;

  /* position:  relative; */
  /* height: calc(100vh - 90px - 40px - 70px - 3px); */
  height: calc(100% - 40px);
  width: 100%;
  overflow: hidden;

  /* border: 1px dotted black; */

  & > div {
    /* border: none; */
  }

`

export const DisciplinePlayMainScreenWrapper = styled.div`
  width: 100%; //calc(100% - 15px);
  /* padding: 0 8px 0 0; */
  /* position: relative; */
  height: calc(100vh - 91px - 70px - 2px );
  /* border: 1px dotted red; */
  overflow: hidden;
`