export function setFontFace( name: string, src: string, style = "normal", weight= 200) {
  return `
    @font-face{
      font-family: ${name};
      src: url( "/fonts/woff2/${src}.woff2" ), url( "/fonts/woff/${src}.woff" );
      font-display: swap;
      font-style: ${style};
      font-weight: ${weight}
    }
  `
}