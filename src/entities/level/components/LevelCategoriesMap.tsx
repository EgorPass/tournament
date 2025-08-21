import { FC, ReactNode } from "react";

export const LevelCategoriesMap: FC<{title: string, children: ReactNode}> = ({title, children}) => (
  <div>
    <span>{ title } &nbsp;</span>
    <span>{ children }</span>
  </div>
)