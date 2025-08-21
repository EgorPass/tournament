import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { ChooseTypeForExportFormWidget, ExportTournamentListFormWidget, ExportUnitListFormWidget } from "../../../widgets/formWidgets"
import { AdminExportHeader } from "../../../widgets/headerWidgets"

const ExportDataPage = () => (
  <>
    <AdminExportHeader />
    <ScrollContainerWrapper>

      <form>
        <ChooseTypeForExportFormWidget /> 
        <ExportUnitListFormWidget />
        <ExportTournamentListFormWidget />
      </form>

    </ScrollContainerWrapper>
  </>
)

export default ExportDataPage