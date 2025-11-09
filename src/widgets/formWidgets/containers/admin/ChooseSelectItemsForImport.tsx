import { useForm } from "react-final-form"
import { FC, MouseEvent } from "react"
import styled from "styled-components"
import { GroupContentForButton } from "../../components/admin/GroupContentForButton"

const MenuItem = styled.div`
  cursor: pointer;
  font-style: italic;
  text-decoration: underline;
`
export const ChooseSelectItemsForImport:FC<{field: string }> = ({ field }) => {
  const form = useForm()
  return (
    <GroupContentForButton>
      <MenuItem
        onClick = { (e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          form.change(field, "all")
        } }
      >Выбрать всех</MenuItem>
      <MenuItem
        onClick = { (e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          form.change(field, "none")
        } }
      >Чистый список</MenuItem>
    </GroupContentForButton>
  )
}