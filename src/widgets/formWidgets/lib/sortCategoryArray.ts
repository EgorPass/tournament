type TFieldType = { from: string, to: string}

export const  sortCategoryArray = (x: TFieldType, y: TFieldType) => {
  const xFrom = +x.from
  const xTo = +x.to
  const yFrom = Number( y.from )
  const yTo = Number( y.to )

  const isNaNXF = window.isNaN( xFrom ) || xFrom === 0
  const isNaNXT = window.isNaN( xTo ) || xTo === 0
  const isNaNYF = window.isNaN( yFrom ) || yFrom === 0
  const isNaNYT = window.isNaN( yTo ) || yTo === 0

  const xF = xFrom ?? 0
  const xT = xTo ?? 0
  const yF = yFrom ?? 0
  const yT = yTo ?? 0
    
  if( isNaNYF || isNaNYT ||  isNaNXT || isNaNXF ) { 
    return 0
  }
  
  if( !isNaNXF && !isNaNXT  ) {
    if(  xF > xT ) {
      return 0
    }
    else if( ( ( xF > yT ) && ( xF > yF ) ) && ( ( xT > yF ) && ( xT > yT ) ) ) {
      return 1
    }
    else {
      return -1
    }
  }
  return 0
}