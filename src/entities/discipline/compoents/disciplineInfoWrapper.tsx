import styled from "styled-components";

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