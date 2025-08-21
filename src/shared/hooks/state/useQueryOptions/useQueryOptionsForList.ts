import { queryOptions } from "@tanstack/react-query"
import { useDBGetMethods } from "../../../store/offlineDB/model/useDBGetMethods"

export const useQueryOptionsForList = () => {
  const { getItemsFromDB } = useDBGetMethods()
  return <T>( storeName: string, field: string, key: string, filterField?:string, filterKey?: string ) => queryOptions({
    queryKey: [ storeName, { [field]: key } ],
    queryFn: async ()=> await getItemsFromDB<T>( storeName, field, key, filterField, filterKey )
  })
}