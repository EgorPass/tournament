import { FC } from "react"
import { StyledTitleGridBox } from "./styledTitleGridBox"
import { RadioboxVStyleItem } from "./radioVStyledItem"

export const RadioboxMenuItem: FC<{callback: Function, title: string, value: string, storeValue: string }> = ({callback, title, value, storeValue }) => {

  return (
    <StyledTitleGridBox
      $cols="auto 25px"
      onClick = { (e) => {
        e.preventDefault()
        callback()
      } }
    >
      <RadioboxVStyleItem
        title = { title }
        prop = { value }
        storeValue = { storeValue }
      />

    </StyledTitleGridBox>
  )
}