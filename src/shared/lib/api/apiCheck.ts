
export const apiCheck = {
  isNotEmpty( obj: object ){
    return obj && Object.values( obj ).filter( it => !!it ).length > 0
  },
  isNumber( number: number ) {
    return !isNaN( number ) && isFinite( number )
  }
}