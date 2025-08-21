import styled from "styled-components";

export const ScrollContainerWrapper = styled.article.attrs<{$type?: string}>( ({$type}) => ({
  className: $type,
}))`
  overflow-y: auto;   //
  overflow-x: hidden;
  height: 100%;     //
  width: auto;

  /* border: 1px dotted green; */

  padding: 0px 6px 0 0;
`;
