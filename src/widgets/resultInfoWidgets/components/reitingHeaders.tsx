import { FC } from "react"
import styled from "styled-components"

export const GenderHeader = styled.h4`
  justify-self: center;
`
export const LevelHeader = styled( GenderHeader )``

export const CategoryHeader: FC<{title: string}> = ({ title }) => (
  <GenderHeader>Категория: { title }</GenderHeader>
)