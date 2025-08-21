import { FC, ReactNode } from "react"
import { ListContainer } from "../listContainer"
import { RadioItem } from "../../../../../shared/components/inputFields/radioBoxItem"

type IRadio = { [key: string]: string }

export const RadioList: FC<{ list: IRadio[], children?: ReactNode }> = ({list, children}) =>(
  <ListContainer>
    {
       list.map(it=>(

        <RadioItem
          key = { it.value }
          name = { it.name }
          value = { it.value }
          title = { it.title }
        />
      ))
    }
    { children }
  </ListContainer>
)