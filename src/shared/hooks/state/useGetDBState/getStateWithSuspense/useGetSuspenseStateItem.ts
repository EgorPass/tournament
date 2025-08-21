import { useSuspenseQuery } from "@tanstack/react-query"
import { useQueryOptionsForItem } from "../../useQueryOptions/useQueryOptionsForItem"

export const useGetSuspenseStateItem = <T>( storeName: string, field: string, key: string ) => {
  const queryOptions = useQueryOptionsForItem()
  return useSuspenseQuery({
    ...queryOptions<T>( storeName, field, key ),
  })
}