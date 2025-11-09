import { useState } from "react"
import { IExportDataItems, IUnit } from "../../../../types"
import { useFormState } from "react-final-form"

export const useImportData = () => {
  const { values } = useFormState()
  const { importData: {
    current_unit, tournament
  }, current_unit_list, tournaments_list } = values as IExportDataItems


  const [ units, setUnits ] = useState<IUnit[]>([])
  console.log( values  )

  return {
    tournaments_list, current_unit_list, current_unit, tournament,
  }
}