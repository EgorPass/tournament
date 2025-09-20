import { FC } from "react";
import { useTheme } from "styled-components";

export const CheckStyleV: FC = () => {
  const theme = useTheme();
  return (
    <>
      <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2L6 11.5065" stroke = { theme.themeColors.color.checker } strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 6L6 12" stroke= {theme.themeColors.color.checker } strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </>
  )
}