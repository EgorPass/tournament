import { FC, ReactNode } from "react"
import styled from "styled-components"
import { GenderHeader } from "./reitingHeaders"

const translate: {[key:string]: string } = {
  "boy": "Мужской пол",
  "girl": "Женский пол"
}

export const GenderWrapper = styled.div`
  
  /* border: 1px dotted red; */
  margin-top: 8px;

  margin-bottom: 20px;
`
export const GenderGround = styled.div`
  padding: 0;
  margin: 0;
  /* border: 1px dotted pink; */

`

export const GenderWrapperComponent:FC<{children: ReactNode, gender: string}> = ( {children, gender } ) => (
  <GenderWrapper>
    <GenderHeader>{ translate[ gender ] }</GenderHeader>
    <GenderGround>{ children }</GenderGround>
  </GenderWrapper>
)
