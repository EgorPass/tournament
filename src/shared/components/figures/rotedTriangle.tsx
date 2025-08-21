import { FC } from "react";
import { useTheme } from "styled-components";
import { RotedBox } from "./rotedBox";

export const RotedTriangle: FC<{isOpen: boolean}> = ({isOpen }) => {
  const theme = useTheme();
  return (
    <RotedBox
      $isOpen = { isOpen }
    >
      <svg width="14" height="14" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          
      <path d="M9 0.000244141L17.6603 15.0002L0.339746 15.0002L9 0.000244141Z" fill= {theme.themeColors.bg.nav.marker}/>
     
      </svg>
    </RotedBox>
  )
}