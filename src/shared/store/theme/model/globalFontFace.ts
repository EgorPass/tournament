import { createGlobalStyle } from "styled-components";
import { setFontFace } from "../lib/setFontFace";

export const GlobalFontFace = createGlobalStyle`
  ${setFontFace("Roboto", "roboto/Roboto-Thin", "normal", 100)}
  ${setFontFace("Roboto", "roboto/Roboto-ThinItalic", "italic", 100)}
  ${setFontFace("Roboto", "roboto/Roboto-Light", "normal", 300)}
  ${setFontFace("Roboto", "roboto/Roboto-LightItalic", "italic", 300)}
  ${setFontFace("Roboto", "roboto/Roboto-Regular", "normal", 400)}
  ${setFontFace("Roboto", "roboto/Roboto-Italic", "italic", 400)}
  ${setFontFace("Roboto", "roboto/Roboto-Medium", "normal", 500)}
  ${setFontFace("Roboto", "roboto/Roboto-MediumItalic", "italic", 500)}
  ${setFontFace("Roboto", "roboto/Roboto-Bold", "normal", 700)}
  ${setFontFace("Roboto", "roboto/Roboto-BoldItalic", "italic", 700)}
  ${setFontFace("Roboto", "roboto/Roboto-Black", "normal", 900)}
  ${setFontFace("Roboto", "roboto/Roboto-BlackItalic", "italic", 900)}

  /* ${setFontFace("Bitter", "bitter/Bitter-Thin", "normal", 100)}
  ${setFontFace("Bitter", "bitter/Bitter-ThinItalic", "italic", 100)}
  ${setFontFace("Bitter", "bitter/Bitter-ExtraLight", "normal", 200)}
  ${setFontFace("Bitter", "bitter/Bitter-ExtraLightItalic", "italic", 200)}
  ${setFontFace("Bitter", "bitter/Bitter-Light", "normal", 300)}
  ${setFontFace("Bitter", "bitter/Bitter-LightItalic", "italic", 300)}
  ${setFontFace("Bitter", "bitter/Bitter-Regular", "normal", 400)}
  ${setFontFace("Bitter", "bitter/Bitter-Italic", "italic", 400)}
  ${setFontFace("Bitter", "bitter/Bitter-Medium", "normal", 500)}
  ${setFontFace("Bitter", "bitter/Bitter-MediumItalic", "italic", 500)}
  ${setFontFace("Bitter", "bitter/Bitter-SemiBold", "normal", 600)}
  ${setFontFace("Bitter", "bitter/Bitter-SemiBoldItalic", "italic", 600)}
  ${setFontFace("Bitter", "bitter/Bitter-Bold", "normal", 700)}
  ${setFontFace("Bitter", "bitter/Bitter-BoldItalic", "italic", 700)}
  ${setFontFace("Bitter", "bitter/Bitter-ExtraBold", "normal", 800)}
  ${setFontFace("Bitter", "bitter/Bitter-ExtraBoldItalic", "italic", 800)}
  ${setFontFace("Bitter", "bitter/Bitter-Black", "normal", 900)}
  ${setFontFace("Bitter", "bitter/Bitter-BlackItalic", "italic", 900)} */
`