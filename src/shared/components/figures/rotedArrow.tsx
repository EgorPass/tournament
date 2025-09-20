import { FC } from "react";
import { RotedBox } from "./rotedBox";
import { useTheme } from "styled-components";

export const RotedArrow: FC<{ isOpen: boolean}> = ({isOpen}) => {
  const theme = useTheme();

  return (
    <RotedBox
      $isOpen = { isOpen }
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M10.4615 4.03846C10.5677 3.78356 10.4472 3.49082 10.1923 3.38462C9.9374 3.27841 9.64467 3.39895 9.53846 3.65385L10.4615 4.03846ZM6.23076 14.1923L10.4615 4.03846L9.53846 3.65385L5.30769 13.8077L6.23076 14.1923Z" 
          fill = { theme.themeColors.color.checker }
        />
        <path 
          d="M10.5308 3.65385C10.4246 3.39895 10.1318 3.27841 9.87693 3.38462C9.62203 3.49082 9.50149 3.78356 9.6077 4.03846L10.5308 3.65385ZM14.7615 13.8077L10.5308 3.65385L9.6077 4.03846L13.8385 14.1923L14.7615 13.8077Z" 
          fill = { theme.themeColors.color.checker }
        />
        <path 
          d="M5.9 13.7002H14.2" 
          stroke="#D9D9D9" 
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path 
          d="M10 8L11.7321 12.5H8.26795L10 8Z" 
          fill = { theme.themeColors.color.checker }
        />
      </svg>

    </RotedBox>
  )
}