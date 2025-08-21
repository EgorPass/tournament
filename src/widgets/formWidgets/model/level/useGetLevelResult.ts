import { ILevel } from "../../../../types"
import { useGetSuspenseStateList } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useGetLevelProps } from "./useGetLevelProps"

export const useGetLevelResult = ( ) => {
  const { values, discipline_id } = useGetLevelProps()
  const { id } = values
  const { data: levels } = useGetSuspenseStateList<ILevel>("level", "discipline_id", discipline_id)
  return { levels: levels?.filter( it=> it.id !== id ) }
}