import { ScrollContainerWrapper } from "../../../shared/components/groupComponents"
import { TournamentAddressFormWidget, TournamentDataFormWidget, TournamentNameFormWidget } from "../../../widgets/formWidgets"
import { TournamentHeaderWidget } from "../../../widgets/headerWidgets"

const CreateTournamet = () => {
  return (
    <>
      <TournamentHeaderWidget />
      <ScrollContainerWrapper>
        <form>
          <TournamentNameFormWidget />
          <TournamentDataFormWidget />
          <TournamentAddressFormWidget />
        </form>
      </ScrollContainerWrapper>
    </>
  )
}
export default CreateTournamet