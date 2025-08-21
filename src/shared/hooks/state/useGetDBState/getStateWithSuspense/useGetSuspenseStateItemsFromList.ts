import { useSuspenseQueries } from "@tanstack/react-query"
import { useQueryOptionsForItem } from "../../useQueryOptions/useQueryOptionsForItem"

// возможно лишнее сделал более понятным и построчным кодом

/**
 *
 * перебирает массив объектов data
 * на каждую итерацию для data делает запрос queryOptions
 *  // либо для item, либо для items
 * в запрос идет название хранилища - storeName, 
 * поле или он же индекс по которому ищем - field
 * 
 * и ключ - key, но этот key он берёт из объекта data
 *  
 */
export const useGetSuspenseStateItemsFromList = <TList, TItem>( data: TList[], storeName: string, field: string, key: string) => {
  const queryOptions = useQueryOptionsForItem(  )
  return useSuspenseQueries({
    queries: data ? data.map( it => ( {
        ...queryOptions<TItem>( storeName, field, ( it as { [key: string]: string} )[key] )
    })) : []
  })
}