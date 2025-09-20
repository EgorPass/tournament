import styled from "styled-components"
import { FC, MouseEvent } from "react"
import { useGetBookMark, useSetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"
import { TBookMark } from "../../../types"

const DisciplineBookMarkItem = styled.div<{$isActive: boolean}>`
  border: ${ props => `1px solid ${ props.theme.themeColors.color.secondaryLine }`};
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({$isActive, theme })=> $isActive ? theme.themeColors.color.navLink : "transparent"  };


  height: 100%;
  width: 100%;

  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme })=> theme.themeColors.color.hoverLink   };
    color:  ${({ theme })=> theme.themeColors.fontColor.hover   };
  }
`

const DisciplineBookMarkContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;

  height: 40px;

  /* border: 1px dotted red; */
  
`

export const DisciplineBookMarkPlayFeature: FC<{bookMarkSet: TBookMark[]}> = ({ bookMarkSet }) => {
  const { setBookMark } = useSetBookMark()
  const bookMark = useGetBookMark()
  return (
    <DisciplineBookMarkContainer>
      {
        bookMarkSet.map( it => (
          <DisciplineBookMarkItem
            key = { it }
            onClick = { 
              ( e: MouseEvent<HTMLDivElement> ) => {
                setBookMark( it )
              }
            }
            $isActive = { it === bookMark }
          >
            { it }
          </DisciplineBookMarkItem>
        ))
      }
    </DisciplineBookMarkContainer>
  )
}