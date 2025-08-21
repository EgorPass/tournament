import { ITournament } from "../../../../types";
import { TourList } from "../../components/admin/TourList";
import { WrapperForList } from "../../components/admin/WrapperForList"
import { useChangeExportListAction } from "../../model/admin/useChangeExportListAction";
import { useExportData } from "../../model/admin/useExportData";

export const ExportTournamentListFormWidget = () => {
  const {
    data, state, isSuccess, tournaments_list
  } = useExportData( "соревнования", "tournament" )
  useChangeExportListAction( data as ITournament[], "соревнования", "tournaments_list", "chooseTours" )

  if( isSuccess && state ) {
    return (
      <WrapperForList
        head = "Соревнования"
        when = "chooseTours"
      >
        <TourList
          data = { data as ITournament[] }
          check_list = { tournaments_list }
        />
      </WrapperForList>
   
    )
  }
  else return null
}