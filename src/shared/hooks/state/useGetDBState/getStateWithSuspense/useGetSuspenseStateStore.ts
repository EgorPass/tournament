import { useSuspenseQuery } from "@tanstack/react-query"
import { useQueryOptionsForStore } from "../../useQueryOptions/useQueryOptionsForStore"

export const useGetSuspenseStateStore = <T>( storeName: string ) => {
  const queryOptions = useQueryOptionsForStore()
  return useSuspenseQuery({
    ...queryOptions<T>( storeName ),
    
  })
}