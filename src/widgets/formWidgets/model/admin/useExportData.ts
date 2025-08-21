import { useFormState } from "react-final-form"
import { useGetStateStore } from "../../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/useGetStateStore"
import { IExportDataItems} from "../../../../types"

export const useExportData = ( choose: string, storeName: string ) => {
  const { values } = useFormState()
  const { typeForExport, current_unit_list, tournaments_list } = values as IExportDataItems
  const state = typeForExport.includes(choose)
  const { data, isSuccess } = useGetStateStore(storeName, state )
  
  return { 
    isSuccess, state, data, 
    current_unit_list, tournaments_list 
  }
}