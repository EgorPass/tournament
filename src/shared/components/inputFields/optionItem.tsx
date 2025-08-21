import { FC } from "react";

export const OptionItem: FC<{value: string, title: string}> = ({value, title }) => (
  <option value = { value } >{ title }</option>
)