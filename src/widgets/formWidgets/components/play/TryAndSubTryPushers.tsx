import { FC } from "react"
import styled from "styled-components"

const SubTryPusherWrapper = styled.div`
  margin: 10px 0 ;
  /* display: flex;
  justify-content: space-evenly; */

`

const PushButton = styled.button`
  text-decoration: underline;
  font-style: italic;
  border: none;
  background: transparent;
  cursor: pointer;
`

const TryPusherWrapper = styled.div`
  
`

interface ISubTryPusher {
  tryAtLevel: number 
  subTryPusher: (tryAtLevel: number) => void
}
export const SubTryPuhser:FC<ISubTryPusher> = ( { tryAtLevel, subTryPusher } ) => {

  return (
    <SubTryPusherWrapper>
      <PushButton
        onClick={ (e) => {
          e.preventDefault() 
          subTryPusher( tryAtLevel )
        }}
        >Добавить поле попытки</PushButton>
    </SubTryPusherWrapper>
  )
}

interface ITryPusher {
  tryPusher: () => void
}
export const TryPusher:FC<ITryPusher> = ({tryPusher}) => {

  return (
    <TryPusherWrapper>
      <PushButton
        onClick={ (e) => {
          e.preventDefault() 
          tryPusher()
        }}
      >Добавить попытку</PushButton>
    </TryPusherWrapper>
  )
}