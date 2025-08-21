// перенести от сюдого 
// export const findEmptyPosition = ( finishedPosition: (string | number)[], position: number, maxPosition: number ) : number | ( () => {} ) => {
export const findEmptyPosition = ( finishedPosition: (string | number)[], position: number, maxPosition: number ) : number => {

  if( finishedPosition.length  ===  maxPosition ) {
    // console.log( "end of try.............")
    return 0 
  } 
  else if( position > maxPosition ) { 
    // console.log( "find at first item ..........")
    position = 1 
    return findEmptyPosition( finishedPosition, position, maxPosition )
  }
  else if( finishedPosition.includes( position ) ) {
    // console.log( "i finded......")
    ++position
    return findEmptyPosition( finishedPosition, position, maxPosition )
  }
  
    // console.log( "wi finded new position")
    return position

}