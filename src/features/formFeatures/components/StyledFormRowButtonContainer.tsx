import styled from "styled-components";

interface ICompProps {
  $aling?: string,
  $just?: string,
}

export const StyledFormRowButtonContainer = styled.div<ICompProps>`
  align-self: ${ ({$aling}) => ( $aling ? $aling: "center") };
  justify-self: ${ ({$just}) => ( $just ? $just: "center") };
  user-select: none;

  color: ${ props => props.theme.themeColors.fontColor.primal};
  /* border: 1px dotted green; */

  & > span {
    text-decoration: underline;
    font-style: italic;
    cursor: pointer;
}
`