import { useQueryClient } from "@tanstack/react-query"
import { useLocationHooks } from "../useLocationHook"

export const useGetQueryData = () => {
  const queryClient = useQueryClient()
  const { currentNodeId } = useLocationHooks()
  const getQuerData = <T>(stroreName: string, field: string, key?: string ) => {
    const currentKey = !!key ? key: currentNodeId
    return queryClient.getQueryData( [stroreName, { [ field ]: currentKey } ] ) as T
  }
  return getQuerData
}