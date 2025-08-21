import { FC, ReactNode } from "react"
import { Header, HeadThree, HeadTwo } from "./header"

interface IMainHeader {
  firstTitle?: string | ReactNode, 
  secondTitle?: string | ReactNode, 
  thirdTitle?: string | ReactNode
}

export const MainHeader: FC<IMainHeader> = ({ firstTitle, secondTitle, thirdTitle}) => {
  
  return (
    <Header>
      { thirdTitle &&  <HeadTwo>{ thirdTitle }</HeadTwo> }
      {
        secondTitle && thirdTitle ? (
          <HeadThree>{ secondTitle }</HeadThree>
        ) : (
          <HeadTwo>{ secondTitle }</HeadTwo>
        ) 
      }
      {
        firstTitle && (secondTitle ? ( 
          <HeadThree>{ firstTitle }</HeadThree>
        ) : (
          <HeadTwo>{ firstTitle }</HeadTwo>
        ))
      }    
  </Header>
  )
}
