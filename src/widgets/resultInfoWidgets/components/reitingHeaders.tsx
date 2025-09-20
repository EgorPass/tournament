import { FC } from "react"
import styled from "styled-components"

export const GenderHeader = styled.h4`
  justify-self: center;
  margin-bottom: 10px;
  /* font-weight: bold; */
`

export const CategoryHeader: FC<{title: string}> = ({ title }) => (
  <GenderHeader>Категория: { title }</GenderHeader>
)