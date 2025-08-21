import { TourList } from "../../components/admin/TourList"
import { WrapperForList } from "../../components/admin/WrapperForList"
import { useChangeImportListAction } from "../../model/admin/useChangeImportLIstAction"
import { useImportData } from "../../model/admin/useImportData"

export const ImportTournamentListFormWidget = () => {

  const { tournament, tournaments_list  } = useImportData()
  useChangeImportListAction( tournament, tournaments_list, "selectTours", "tournaments_list")

  if( tournament.length > 0 )
    return (
      <WrapperForList 
        when = "chooseTours"
        head = "Соревнования"
      >
        <TourList 
          data = { tournament }
          check_list = { tournaments_list }
        />
      </WrapperForList>
    )
  else return null
}