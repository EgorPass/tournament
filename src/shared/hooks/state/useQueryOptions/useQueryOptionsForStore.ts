import { queryOptions } from "@tanstack/react-query"
import { useDBGetMethods } from "../../../store/offlineDB/model/useDBGetMethods"

export const useQueryOptionsForStore = () => {
  const { getStoreFromDB } = useDBGetMethods()
  return <T>( storeName: string ) => queryOptions({
    queryKey: [ storeName ],
    queryFn: async() => await getStoreFromDB<T>( storeName )
  })
}