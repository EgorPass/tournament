import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { baseTheme, darkTheme, lightTheme } from "../config/theme";
import { GlobalStyle } from "../model/GlobalStyle";
import { GlobalFontFace } from "../model/globalFontFace";
import { useGetThemeStore } from "../../redux/slices/themeSlice";

const ThemeProvierWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
  
  const themeType = useGetThemeStore();
  const [initTheme, setInitTheme] = useState( {...baseTheme, themeColors:lightTheme } )

  useEffect( ()=> {
    let theme;  
    if( themeType === "light") {
      theme = lightTheme
    }
    else {
      theme = darkTheme
    }
      
      setInitTheme( {...baseTheme, type: themeType, themeColors: theme})
    }
    , [ themeType ]
    )
    
  // console.log( "theme in theme provider", themeType)
  // console.log( themeType )
  // console.log( baseTheme )
  return (
    <ThemeProvider theme = { initTheme }>
      <GlobalFontFace/>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

// export default ThemeProvierWrapper
export default  ThemeProvierWrapper 
