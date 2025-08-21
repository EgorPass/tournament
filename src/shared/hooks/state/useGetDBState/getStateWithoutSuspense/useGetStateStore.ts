import { useQuery } from "@tanstack/react-query"
import { useQueryOptionsForStore } from "../../useQueryOptions/useQueryOptionsForStore"

export const useGetStateStore = <T>( stroreName : string, state: boolean ) => {
  const queryOptions = useQueryOptionsForStore()
  return useQuery({
    ...queryOptions<T>( stroreName ),
    enabled: state,
  })
}