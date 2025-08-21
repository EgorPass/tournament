import { FC, ReactNode } from "react";
// import { StyledListGridAutoFill } from "../generic/StyledListGridAutoFill";
import { FieldArrayPusherFeature } from "../../../../features/formFeatures";
import styled from "styled-components";
import { FormRowComponentWithTitle } from "../generic/formRowComponentWithTitle";

interface IProps {
  name: string,
  title: string,
  buttonTitle: string,
  children: ReactNode,
  
  $col?: string,
  $rowGap?: string,
  $colGap?: string,

  mutatorField: {[key: string]: string | string[] }

}
interface IValuesGrid {
  $col?: string,
  $rowGap?: string,
  $colGap?: string,
  $just?:string,
  $aling?: string,
}
export const TwoRowContainer = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
  padding: 0;
  margin: 0;
`
export const StyledListGridAutoFill = styled.div<IValuesGrid>`
  display: grid;
  justify-items: ${ ( {$just}) => ( $just ? $just : "start")};
  align-items: ${ ( {$aling}) => ( $aling ? $aling : "center")};
  grid-template-columns: ${ ( {$col} ) => ( $col ? $col: "repeat(auto-fill, auto)") };
  grid-row-gap: ${ ( {$rowGap}) => ( $rowGap ? $rowGap : "0")};
  grid-column-gap: ${ ( {$colGap}) => ( $colGap ? $colGap : "0")};
  height: auto;
  padding-left: 10px;
  @media (${props => props.theme.media.max}) {
    padding-left: 0;
  }
`

export const FormRowComponentForFieldArray: FC<IProps> = ({ title,children, name, buttonTitle, $rowGap, $col, $colGap, mutatorField }) =>  (
  <FormRowComponentWithTitle title = { title }>
    <TwoRowContainer>
      <StyledListGridAutoFill $col={ $col } $rowGap={ $rowGap } $colGap={ $colGap } >
        { children  }
      </StyledListGridAutoFill>
      <FieldArrayPusherFeature 
        name = { name } 
        pushTitle = { buttonTitle }
        mutatorField = { mutatorField }
      />
    </TwoRowContainer> 
  </FormRowComponentWithTitle>
)
