import { TournamentSearchFilterFeature } from "../../features/searchFilterFeatures"
import { GroupContentWrapper, ScrollContainerWrapper } from "../../shared/components/groupComponents"
import { suspenseHOCWrapper } from "../../shared/HOCs"
import { useGetSuspenseStateStore } from "../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"
import { ITournament } from "../../types"
import { TournamentsHeaderWidget } from "../../widgets/headerWidgets"
import { TournamentsPageSortTreeContainer } from "../../widgets/listWidgets"

const TournamentsPage = suspenseHOCWrapper( 
  () => {
  console.log( "tournament Widget render ......")
  const { data: tournaments } = useGetSuspenseStateStore<ITournament>("tournament")
  return(
    <>
      <TournamentsHeaderWidget />
      <TournamentSearchFilterFeature />

      <ScrollContainerWrapper>
        <GroupContentWrapper>
          <TournamentsPageSortTreeContainer tournaments = { tournaments } />
        </GroupContentWrapper>
      </ScrollContainerWrapper>
    </>
  )
}
)

export default TournamentsPage