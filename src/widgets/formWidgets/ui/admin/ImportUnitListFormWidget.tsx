import { UnitList } from "../../components/admin/UnitList"
import { WrapperForList } from "../../components/admin/WrapperForList"
import { useChangeImportListAction } from "../../model/admin/useChangeImportLIstAction"
import { useImportData } from "../../model/admin/useImportData"

export const ImportUnitListFormWidget = () => {

  const { current_unit, current_unit_list } = useImportData()
  useChangeImportListAction( current_unit, current_unit_list, "selectUnits", "current_unit_list")

  if( current_unit.length > 0 )
    return (
      <WrapperForList 
        when = "chooseUnits"
        head = "Спортсмены"
      >
        <UnitList 
          data = { current_unit }
          check_list = { current_unit_list }
        />
      </WrapperForList>
    )
  else return null
}