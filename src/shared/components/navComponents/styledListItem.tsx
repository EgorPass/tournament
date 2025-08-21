import styled from "styled-components";

export const StyledListItem = styled.li`
  margin: ${ (props) => props.theme.nav.listItem.mr.ph};
  & a {
    text-decoration: none;
  }
  @media (${(props) => props.theme.media.desc_min}) {
    margin: ${ (props) => props.theme.nav.listItem.mr.ds};
  }
`;