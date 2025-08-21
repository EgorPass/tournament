import { useQuery } from "@tanstack/react-query"

import { useQueryOptionsForItem } from "../../useQueryOptions/useQueryOptionsForItem"

export const useGetStateItem = <T>( storeName: string, field: string, key: string, state = true ) => {
  const queryOptions = useQueryOptionsForItem()
  return useQuery({
    ...queryOptions<T>( storeName, field, key ),
    enabled: state,
    // staleTime: 0,
  })
}