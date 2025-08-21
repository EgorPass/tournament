import { FC } from "react";
import { ListContainer } from "../listContainer";
import { Checkbox } from "../../../../../shared/components/inputFields/checkBoxItem";


export const CheckboxList:FC<{checkboxlist: string[] | undefined, name: string}> = ({ checkboxlist, name}) => (
  <ListContainer>
    {
      checkboxlist?.map(it => (
        <Checkbox
          key = { it }
          name = { name }
          value = { it }
          title = { it }
        />
      ))
    }
  </ListContainer>
)