import { FC } from "react"
import { Anchor, ListItem, UnOderList } from "./HomeComponents"

export const AnchorList:FC<{list: {title: string, href: string}[] }>  = ({ list }) => (
  <UnOderList>
    { 
      list.map( it => (
        <ListItem key = { it.href }>
          <Anchor href = { it.href } >{ it.title }</Anchor>
        </ListItem>
      ))
    }
  </UnOderList>
)