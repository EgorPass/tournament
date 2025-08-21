import styled from "styled-components"
import { MouseEvent } from "react"
import { bookMarkSet } from "../config/bookMarkSet"
import { useGetBookMark, useSetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"

const DisciplineBookMarkItem = styled.div<{$color: boolean}>`
  border: 1px solid rgba(0, 0, 0, .03);
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({$color})=> $color ? "#f8f8e9" : "transparent"  };

  height: 100%;
  width: 100%;

  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #f8f8e9;

  }
`

const DisciplineBookMarkContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;

  height: 40px;

  /* border: 1px dotted red; */
  
`

export const DisciplineBookMarkPlayFeature = () => {
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
            $color = { it === bookMark }
          >
            { it }
          </DisciplineBookMarkItem>
        ))
      }
    </DisciplineBookMarkContainer>
  )
}