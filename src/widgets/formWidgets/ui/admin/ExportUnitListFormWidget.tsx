import { suspenseHOCWrapper } from "../../../../shared/HOCs"
import { IUnit } from "../../../../types"
import { UnitList } from "../../components/admin/UnitList"
import { WrapperForList } from "../../components/admin/WrapperForList"
import { useChangeExportListAction } from "../../model/admin/useChangeExportListAction"
import { useExportData } from "../../model/admin/useExportData"

export const ExportUnitListFormWidget = suspenseHOCWrapper(
  () => {

    const { 
      data, state, isSuccess, current_unit_list
    } = useExportData( "спортсмены", "current_unit")
    useChangeExportListAction(data as IUnit[], "спортсмены", "current_unit_list", "chooseUnits" )
    
    if ( isSuccess && state ) {
      return (
        <WrapperForList
          head = "Спортсмены"
          when = "chooseUnits"
        >
          <UnitList 
            data = { data as IUnit[] } 
            check_list = { current_unit_list }
          />
        </WrapperForList>
    )
    }
    else return null
  }
)