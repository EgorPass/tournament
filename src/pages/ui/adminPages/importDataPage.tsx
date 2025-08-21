import {  ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { ChooseFileForImportFormWidget, ImportTournamentListFormWidget, ImportUnitListFormWidget } from "../../../widgets/formWidgets"
import { AdminImportHeader } from "../../../widgets/headerWidgets"

const ImportDataPage = () =>  (
  <>
    <AdminImportHeader />
    <ScrollContainerWrapper>
      <form>
        <ChooseFileForImportFormWidget />
        <ImportUnitListFormWidget />
        <ImportTournamentListFormWidget />
      </form>
    </ScrollContainerWrapper>

  </>
)

export default ImportDataPage