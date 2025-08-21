import { FC } from "react"
import { IUnit } from "../../../types"
import { apiUnit } from "../../../shared/lib/api/apiUnit"
import { StyledGridAreaItem } from "../../../shared/components/groupComponents"
import styled from "styled-components"

interface IUnitMainInfo {
  unit: IUnit | undefined,
  type: "current_unit" | "tournament_unit" | "unit_list",
  age?: string,
  weight?: string,
}

const UnitStyleWrapper = styled.div<{$type: string}>`
  width: 100%;
  display: grid;
  grid-template-areas:  "unit-gender unit-weight"
                        "unit-birthday unit-age"
                        "unit-city unit-city";
  grid-template-columns: ${({$type}) => {
    if( $type === "unit_list" ) return "auto 57px"
    else return "auto 124px"
  }};
  margin: ${({$type}) => $type === "unit_list" ? "0" : "0 auto" };
  
  & div{
    line-height: 1.4;
  }
  
  & div {
    /* width: auto; */
    /* justify-self: start; */
    /* align-items: stretch; */
  }
  & div:nth-child(odd) {
    justify-self: start;
  }

  & div:nth-child(even) {
    justify-self: start;
  }
  /* justify-content: stretch; */

  @media (${props => props.theme.media.large}) {
    max-width: ${({$type}) => $type === "unit_list" ? "100%" : "450px" };;
  }
`

export const UnitMainInfo: FC<IUnitMainInfo> = ({unit, type, age = "", weight = "" }) => {
  const { unitAge, unitDate, unitGender, unitWeight } = apiUnit.getUnitProps( unit!, age, weight )
  return (
    <>
      { unit && (  
        <UnitStyleWrapper $type = { type }>
          <StyledGridAreaItem
            $gridArea = "unit-gender">{ unitGender }
          </StyledGridAreaItem>
          <StyledGridAreaItem 
            $gridArea="unit-weight"
          >{ ( type === "unit_list" ? "" : "вес: " ) + unitWeight }
          </StyledGridAreaItem>
          <StyledGridAreaItem 
            $gridArea = "unit-birthday"
          >{ unitDate }
          </StyledGridAreaItem>
          <StyledGridAreaItem 
            $gridArea = "unit-age"
          >{ ( type === "unit_list" ? "" : "возраст: " ) + unitAge }
          </StyledGridAreaItem> 
          <StyledGridAreaItem 
            $gridArea = "unit-city"
          >г. { unit.borncity}
          </StyledGridAreaItem> 
      </UnitStyleWrapper>
    )}
    </>
  )
}