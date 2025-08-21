import { useQuery } from "@tanstack/react-query"
import { useQueryOptionsForList } from "../../useQueryOptions/useQueryOptionsForList"

export const useGetStateList = <T>( storeName: string, field: string, key: string, state = true, filterField?: string, filterKey?: string  ) => {
  const queryOptions = useQueryOptionsForList()
  return useQuery({
    ...queryOptions<T>( storeName, field, key ),
    enabled: state,
  })
}