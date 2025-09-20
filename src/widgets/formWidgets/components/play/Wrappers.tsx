import styled from "styled-components"

export const PlayerFormWrapper = styled.div`
  
  border-bottom: ${ props => `1px solid ${ props.theme.themeColors.color.secondaryLine }`};

  &:last-child{
    border-bottom: none;
  }

`

export const ErrorWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 30px;
  /* grid-column-gap: 5px;  */
  /* align-items: center;
  grid-template-rows: auto;
  border: 1px solid black; */

`

export const ResultRowWrapper = styled.div`
display: grid;
grid-template-columns: 80px auto;
grid-column-gap: 10px;
align-items: center;
margin-bottom: 10px;


& input::placeholder {
  text-align: center;
}

/* border: 1px solid green; */

`
export const PusherRowWrapper = styled.div`
  /* grid-area: pusher; */
  
  display: flex;
  flex-flow: row nowrap;
  justify-items: left;

  margin-bottom: 10px;

  & > div:nth-child(2) {
    margin-left: 30px;
  }
`

export const FieldArrayWrapper = styled.div`
  margin-bottom: 10px;

`

export const UnitTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  align-items: center;
  justify-items: start;

  margin: 5px 0 5px 0;
  padding: 0;
  
`

export const DisciplinePlayLevelWrapper = styled.div`
  height: 100%;
  overflow-y: auto;

  padding: 15px 15px;
  /* max-width: 400px;
  margin: 0 auto; */
  /* border: 1px dotted black; */
`