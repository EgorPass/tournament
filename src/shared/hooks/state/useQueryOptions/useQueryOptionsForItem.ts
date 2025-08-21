import { queryOptions } from "@tanstack/react-query"
import { useDBGetMethods } from "../../../store/offlineDB/model/useDBGetMethods"

export const useQueryOptionsForItem = () => {
  const { getItemFromDB } = useDBGetMethods()
  return <T>( storeName: string, field: string, key: string ) => queryOptions({
    queryKey: [ storeName, { [field]: key } ],
    queryFn: async ()=> await getItemFromDB<T>( storeName, field, key )
  })
}