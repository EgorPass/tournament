import { useSuspenseQuery } from "@tanstack/react-query"
import { useQueryOptionsForList } from "../../useQueryOptions/useQueryOptionsForList"

export const useGetSuspenseStateList = <T>( storeName: string, field: string, key: string, filterField?: string, filterKey?: string ) => {
  const queryOptions = useQueryOptionsForList()
  return useSuspenseQuery({
    ...queryOptions<T>( storeName, field, key, filterField, filterKey )
  })
}