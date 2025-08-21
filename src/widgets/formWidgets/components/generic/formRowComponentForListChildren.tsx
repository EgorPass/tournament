import { FC, ReactNode } from "react";
import { FormRowComponentWithTitle } from "./formRowComponentWithTitle";
import { ListContainer } from "./listContainer";


export const FormRowComponentForListChildren: FC<{title: string, children: ReactNode}> = ({title, children}) => (
  <FormRowComponentWithTitle title = { title }>
    <ListContainer>{ children }</ListContainer>
  </FormRowComponentWithTitle>  
)