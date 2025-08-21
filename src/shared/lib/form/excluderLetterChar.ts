export const excluderLetterChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const key =  e.key 
  // console.log( e.code )
  if(
      key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowUp" || 
      key === "ArrowRight" || key === "Backspace" || key === "Delete"  
  ) {
    // console.log( key )
    return key
  }
  else if ( isNaN(Number( key ) ) || key === " " || e.code === "Space" ) {
    e.preventDefault();
  }
}