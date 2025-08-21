import { FC } from "react"
import { CheckStyleV } from "../../assets/checkStyleV"
import { StyledNavTitle } from "./styledNavTitle"

export const RadioboxVStyleItem: FC<{title: string, storeValue: string, prop: string}> = ({title, storeValue, prop}) => {

  return (
    <>
      <div>
        <StyledNavTitle> { title } </StyledNavTitle>
      </div>

      <div>
        { storeValue === prop && ( <CheckStyleV /> ) }
      </div>
    </>
  )
}