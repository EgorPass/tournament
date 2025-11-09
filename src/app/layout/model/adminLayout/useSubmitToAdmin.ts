import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IExportDataItems } from "../../../../types"
import { useExportDataToDisc } from "./useExportDataToDisc"
import { useImportDataFormDisc } from "./useImportDataFromDisc"
import { useRFFState } from "../../../../features/layoutFeatures/model/useRFFState"
import { useReset } from "../../../../widgets/formWidgets/model/admin/useReset"

export const useSubmitToAdmin = ( pathname: string ) => {

  const queryClient = useQueryClient()
  const exportDataToDisc = useExportDataToDisc()
  const importDataFromDisc = useImportDataFormDisc()

  // const reset = useReset()


  return useMutation({
    mutationKey: [ pathname ],
    mutationFn: async( values: IExportDataItems ) => {
      if( pathname === "export") {
        await exportDataToDisc( values )
        
      } 
      if( pathname === "import" ) {
        await importDataFromDisc( values )
        await queryClient.invalidateQueries() 
      }

      console.log( values )
    }
  })
}