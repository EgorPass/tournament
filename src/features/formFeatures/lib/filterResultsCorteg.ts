import { TModalDqCorteg, TModalResultCorteg, TObjectStrings, TResults } from "../../../types";



/**
 * 
 * Функкция удаляет из TDqCorteg[] | TResutCorteg[]
 *  - полностью попытку;
 *  - только поле попытки.
 * 
 * А так же смещает нумерацию попыток или нумерацию полей попыток.
 * 
 * В зависимости передан ли в параметр аргумент subTryNumber.
 * 
 */
export function filterAndReplaceResultsCorteg<T extends TModalDqCorteg | TModalResultCorteg>( 
  array: T[], 
  tryAtLevel: number,
  subTryNumber?: number 
) : T[] {
return array
  .filter( it => {
    const [ tryNumber ] = it
    const [ , currentTry, currentSub ] = tryNumber.split("-").map( it => +it )
  
    if( !!subTryNumber ) {
      return ( currentTry === tryAtLevel && currentSub === subTryNumber ) ? false: true
    }
    else if( !subTryNumber) {
      return currentTry !== tryAtLevel
    }
    else {
      return it 
    }
  })
  .map( it => {
    const [ tryNumber, data ] = it
    const [ , currentTry, currentSub ] = tryNumber.split("-").map( it => +it )
    
    if( !!subTryNumber ) {
      if( currentTry === tryAtLevel && currentSub > subTryNumber ) {
        return [ `result-${currentTry}-${ currentSub - 1 }`, data ]
      }
    }
    else if ( !subTryNumber ){
      if( currentTry > tryAtLevel ) {
        return [ `result-${currentTry - 1}-${ currentSub }`, data ]
      }
    }
      return it
  }) as T[]
}

type TResultsObj = { [k: string]: TResults }
type TDqObj = { [k: string]: TObjectStrings[] }
export function resetFields<T extends TModalDqCorteg | TModalResultCorteg, R extends TResultsObj | TDqObj >( array: T[], isDq = false): T[] {
  return array.map( it => {
    const [ tryNumber, data ] = it 
            
    const newData = Object.fromEntries( 
      
      Object.entries( data ).map( it => {
        const [ id ] = it
        if( isDq ) {
          return [ id, [] ] 
        }
          return [ id, { errors: [], results: {} } ]
      })

    ) as R
    return [ tryNumber, newData ] as T
  })
}



// newResultsData = resultsData.filter( it => {
        //   const [ tryNumber ] = it 
        //   const [ , currentTry ] = tryNumber.split("-").map( it => +it )
        //   return currentTry !== tryAtLevel
        // })
        // .map( it => {
        //   const [ tryNumber, data ] = it 
        //   const [ , currentTry, currentSub ] = tryNumber.split("-").map( it => +it )
        //   if( currentTry > tryAtLevel ) {
        //     return [ `result-${currentTry - 1}-${ currentSub }`, data ]
        //   }
        //   return it
        // })


         // newResultsData = resultsData.filter( it => {
        //   const [ tryNumber ] = it 
        //   const [ , currentTry, currentSub ] = tryNumber.split("-").map( it => +it )
        //   return ( currentTry === tryAtLevel && currentSub === subTryNumber ) ? false: true
        // })
        // .map( it => {
        //   const [ tryNumber, data ] = it
        //   const [ , currentTry, currentSub ] = tryNumber.split("-").map( it => +it )
        //   if( currentTry === tryAtLevel && currentSub > subTryNumber ) {
        //     return [ `result-${currentTry}-${ currentSub - 1 }`, data ]
        //   }
        //   return it
        // })