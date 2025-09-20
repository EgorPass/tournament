import { FC, ReactNode } from "react"
import styled from "styled-components"


const LevelGround = styled.div`
/* border: 1px dotted green; */
/* height: 100%; */
`

const LevelWrapper = styled.div`

  position: sticky;

  height: 100%;

  @media (${props => props.theme.media.max}) {
    border-right: ${ props => `1px solid ${ props.theme.themeColors.color.secondaryLine}`};

    &:last-child {
      border-right: none;
    }
  }
`

export const StyledLevelHeader = styled.div`

  min-height: 50px;
  width: 90%;
  padding: 5px 0 5px 0;
  
  border-bottom: ${props => `1px solid ${ props.theme.themeColors.color.secondaryLine } ` };

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

export const StickyContainer = styled.h4`
  display: flex;
  justify-self: center;
  margin-bottom: 10px;
  justify-content: center;
  position: sticky;
  top: -15px;
  z-index: 100;
  width: 100%;
  background-color: ${ props => props.theme.themeColors.color.mainBg };

`
export const LevelHeader:FC<{children: ReactNode}> = ({ children }) => {

  return (
    <StickyContainer>
      <StyledLevelHeader>
        <span>этап дисциплины:&nbsp;</span>
        <span>{ children }</span>
      </StyledLevelHeader>
    </StickyContainer>
  )
}

export const LevelWrapperComponent:FC<{ level_name: string, children: ReactNode}> = ({ level_name, children }) =>  (
  <LevelWrapper >
    <LevelHeader>{ level_name }</LevelHeader>
    <LevelGround>{ children }</LevelGround>
  </LevelWrapper>      
)
