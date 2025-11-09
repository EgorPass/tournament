import styled from "styled-components";
import { GroupLinks } from "../../../../shared/components/groupComponents";

export const GroupContentForButton = styled( GroupLinks )`
  grid-template-columns: repeat(auto-fit, 308px);
  column-gap: 15px;
  min-height: 50px;
  margin: 10px 0;
  @media (${props => props.theme.media.max}) {
    /* column-gap: 50px; */

    /* grid-template-columns: repeat(auto-fit, 308px); */
    /* justify-content: start; */
 }
`