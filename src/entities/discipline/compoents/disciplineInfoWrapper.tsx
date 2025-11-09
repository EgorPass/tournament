import styled from "styled-components";

export const DisciplineUnitEmplyListWrapper = styled.div`
  
  margin: 0 auto;

  @media (${props => props.theme.media.max}) {
    max-width: 520px;
   

    justify-content: stretch;     
  }

`

export const DisciplineInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: "rule-condition"
                          "rule-categories"
                          "rule-men"
                          "rule-women"
                          "rule-dqs";
  justify-content: center;
  margin: 0 auto;
  grid-row-gap: 3px;

  @media (${props => props.theme.media.max}) {
    max-width: 520px;
    grid-template-columns: 270px 250px;
    grid-template-areas: " rule-categories rule-condition"
    "rule-men rule-women"
    "rule-dqs rule-dqs"
                          ;

    justify-content: stretch;     
  }
`

export const DisciplineDescriptionWrapper = styled.div`
  height : 100%;
  overflow: auto;
  padding: 15px 15px;

  /* width: calc(100% + 8px); */
`
export const UnOderList = styled.ul`
  max-width: 560px;
  list-style-type: none;
  padding: 0;
  margin: 10px auto 10px;
`

export const LevelListItem = styled.li`
  
  margin-bottom: 10px;
  /* padding-bottom: 10px; */

  & h6{
    border-bottom: ${ props => `1px solid ${ props.theme.themeColors.color.secondaryLine }`};
    margin-bottom: 8px;
    text-align: center;

    @media (${props => props.theme.media.max}) {
      text-align: start;
      text-indent: 30px;  
    }
  }
`

export const DataDiv = styled.div<{$topMargin?: string}>`
  margin-bottom: 15px;
  margin-top: ${props=> props.$topMargin? props.$topMargin: "0" };
  text-align: ${props=> props.$topMargin? "center": "start" };

  &:last-child{
    margin-bottom: 0;
  }

  & em {
    font-style: italic;
  }
`

export const LevelsWrapper = styled.div`
  margin-top: 15px;

`