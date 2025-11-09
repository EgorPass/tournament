import { FC } from "react";
import { LinkBox } from "../../../shared/components/buttonsAndLinks";
import { ITournamentUnitData } from "../../../types";
import styled from "styled-components";
import { StyledGridAreaItem } from "../../../shared/components/groupComponents";

const UnitWrapper = styled.div`
  /* border: 1px dotted black; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "unit-number unit-name" "unit-number unit-range";
  grid-column-gap: 15px;
  justify-content: start;
`

export const TournamentUnitLinkBox: FC<ITournamentUnitData> = ({unit, tournamentUnit, range, id}) => (
  <LinkBox
    to = "/api/view/tournament_unit"
    state = {{ 
      from: { id, pathname: "tournament_unit" },
    }}
  >
    <UnitWrapper>
      
      <StyledGridAreaItem 
        $gridArea="unit-number" 
        style = {{ 
          "alignSelf": "center",
          // width: "30px",
          // border: "1px dotted black"
        }}
      >
        { tournamentUnit.number }
      </StyledGridAreaItem>
      
      <StyledGridAreaItem 
        $gridArea="unit-name"
        style = {{
          justifySelf: "start",
        }}
      >
        {`${unit.lastName} ${unit.firstName} ${unit.secondName}` }
      </StyledGridAreaItem>
      
      <StyledGridAreaItem 
        style = {{
          justifySelf: "center",
        }}
        $gridArea="unit-range">
        { range && ( <>&nbsp;категория { range }</> ) }
      </StyledGridAreaItem>
    
    </UnitWrapper>
   
  </LinkBox>
)