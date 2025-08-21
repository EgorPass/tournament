export const fieldTargetClick = (e: React.MouseEvent ) => {
  const target = e.target as HTMLInputElement
  const label = target.closest( "label")
  if( label )  {
    const radio = label.querySelector("input[type='radio']") as HTMLInputElement
    if( radio)  radio.click();
  }
}