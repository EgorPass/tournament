import { FC } from "react";
import { Link, useMatch } from "react-router-dom";
import { useTheme } from "styled-components";
import { StyledTitleGridBox } from "../../../shared/components/navComponents/styledTitleGridBox";

export const CustomLink: FC<{to: string, title: string, state?: any}> = ({to, title, state}) => {
  // console.log( "render Custom Link ")
  const match = useMatch(to)
  const theme = useTheme();

  return(
    <StyledTitleGridBox
      as = { Link }
      to = { to }
      state = { state }
      $bg = { match ? theme.themeColors.color.navLink : undefined }
      $cr = {  match ? theme.themeColors.fontColor.hover : undefined }
    >
      { title }
    </StyledTitleGridBox> 
  )
}
