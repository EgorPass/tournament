import { apiForCreateData } from "../../../lib/api/apiForCreateData"
import { useOfflineDBContextConsumer } from "../uI/contextOfflineDBProvider"

// const throtling = async ( ms: number ) => {
  // return new Promise( res => setTimeout( () => res( true  ), ms )
  // )
// }

export const useDBSetMethods = () => {
  const db = useOfflineDBContextConsumer()

  const changeAtDB = async <T>( storeName: string, data: T | T[] ) => {
    let arr: T[] = []
    try{
      const result = await db!.changeDBData<T>( "change", storeName, data )
      arr.push( ...result )
      return arr;
    }
    catch( err ) {
      if( err instanceof Error ) throw new Error( err.message )
      else throw new Error( "Oops")
    }
  }

  const addToDB = async <T>( storeName: string, data: T | T[] ) => {
    let arr: T[] = []
    try{
      if( Array.isArray( data ) ) {
        data = data.map( it => {
          const id = apiForCreateData.createUniqeId()
          return { ...it, id }
        } )
      }
      else {
        const id = apiForCreateData.createUniqeId()
        data = { ...data, id }
      }
      // console.log( data )
      const result = await db!.changeDBData( "change", storeName, data )
      arr.push( ...result )
      return arr
    }
    catch( err ) {
      if( err instanceof Error ) throw new Error( err.message )
      else throw new Error( "Oops")
    }
  }

  const removeFromDB = async <T>( storeName: string, data: T | T[] ) => {
    let arr: T[] = []
    // console.log( data )
    try{
      const result = await db!.changeDBData( "remove", storeName, data )
      arr.push( ...result )
      // console.log( arr )
      return arr
    }
    catch( err ) {
      if( err instanceof Error ) throw new Error( err.message )
      else throw new Error( "Oops")
    }
  }


  return {
    addToDB, changeAtDB, removeFromDB
  }


}