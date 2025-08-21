import styled, { useTheme } from "styled-components"
import { Oval } from "react-loader-spinner"

const StyledLoaderSpiner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  
  width: 100%;
  height: 100%;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${ props => props.theme.themeColors.loader.bg } ;

  & > div:last-child {
    text-shadow: 2px 2px 4px gray;
  }
`

export const LoaderSpinner = () => {

  const theme = useTheme()
  const color = theme.themeColors.loader.color ? theme.themeColors.loader.color : "gray"
  const secondaryColor = theme.themeColors.loader.secondaryColor ?
                         theme.themeColors.loader.secondaryColor : "white"

  return (
    <StyledLoaderSpiner>
      <Oval 
        width = { "100" }
        height = { "100" }
        strokeWidth = "2"
        strokeWidthSecondary = "1"
        color = { color }
        secondaryColor = { secondaryColor }

      />
        <div>Подождите, пожалуйста!</div>
      </StyledLoaderSpiner>
  )
}