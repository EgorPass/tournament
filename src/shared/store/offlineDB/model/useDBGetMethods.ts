// import { TQueryFuncOptions } from "../../../../types"
import { useOfflineDBContextConsumer } from "../uI/contextOfflineDBProvider"

// const throtling = async ( ms: number ) => {
  // return new Promise( res => setTimeout( () => res( true  ), ms )
  // )
// }

export const useDBGetMethods = () => {
  const db = useOfflineDBContextConsumer()
  
  const getItemFromDB= async<T>( storeName: string, field: string, key: string ): Promise< T | undefined > => {
    try {
        // await throtling( 200 )
      const result = await db!.getItem<T>( storeName, field, key )
      return result
    }
    catch(err) {
      if( err instanceof Error) throw new Error ( "err.message" )
        else throw new Error( "Oops")
    }
  }

  const getItemsFromDB = async<T>( storeName: string, field: string, key: string, filterField?: string, filterKey?:string ) : Promise<T[]> => {
    try {
      // await throtling( 1000 )

      const result = await db!.getItems<T>( storeName, field, key, filterField, filterKey )
      return result
    }
    catch( err ) {
      if( err instanceof Error ) throw new Error( err.message )
        else throw new Error( "Oops")
    }
  }

  const getStoreFromDB = async<T>( storeName: string ) : Promise<T[]> => {
    try{
      const data = await db!.getItems<T>( storeName )
      return data
    }
    catch(err) {
      if( err instanceof Error ) throw new Error( err.message )
      else throw new Error( "Oops")
    }
  }

  // const getStateForForm = () => {
  //   return async( id: string, opt?: TQueryFuncOptions ) => {
  //     try{
  //       const item = await db!.getItem( opt?.pathname!, "id", id ) 
  //       if( opt?.pathname === "tournament_unit") {
  //         const list = await db!.getItems( "tournament_unit_discipline", "tournament_unit_id", id )
  //         return { list, unit: item }
  //       }
  //       else return item ? item : {}
  //     }
  //     catch(err) {
  //       if( err instanceof Error ) throw new Error( err.message )
  //       else throw new Error( "Oops")
  //     }
  //   }

  // }

  return {
    // getStateForForm,
    getItemFromDB, getItemsFromDB, getStoreFromDB, 
  }
}