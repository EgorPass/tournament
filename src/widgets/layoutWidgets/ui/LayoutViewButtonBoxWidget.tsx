import { BackButtonFeature, ChangeButtonFeature } from "../../../features/layoutFeatures";
import { BackButtonPlayerReitingFeature } from "../../../features/layoutFeatures/ui/BackButtonPlayerReitingFeature";
import { useGetStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithoutSuspense/getStateItem";
import { useLocationHooks } from "../../../shared/hooks/useLocationHook";
import { useGetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";
import { IDiscipline, ILevel, ITournament } from "../../../types";
import { LayoutButtonBox } from "../components/LayoutButtonBox";

export const LayoutViewButtonBoxWidget = () => {

  const { currentNodeId, pathname } = useLocationHooks()
  const playerModalReiting = useGetPlayerModalReiting()
  const { data: discipline } = useGetStateItem<IDiscipline>("discipline", "id", currentNodeId, ( !!currentNodeId && ( pathname === "discipline" ) ) )
  const { data: tournament } = useGetStateItem<ITournament>("tournament", "id", currentNodeId, ( !!currentNodeId && ( pathname === "tournament" ) ) )

  const { data: level } = useGetStateItem<ILevel>( "level", "id", currentNodeId, ( !!currentNodeId && ( pathname === "level" )  ) )

  const isDisciplinePrepare = !!discipline && ( discipline.status === "prepare" )
  const isTournamentPrepare = !!tournament && ( tournament.status === "prepare" ) 
  const isLevelPrepare = !!level && ( level.status === "prepare" )

  const isClear = pathname === "tournaments" || pathname === "current_unit" || "tournament_unit"

  return (
    <>
    {
      playerModalReiting.status ? (
        <LayoutButtonBox type = "view-buttons-container">
          <BackButtonPlayerReitingFeature />
        </LayoutButtonBox>
      ) : (
        <LayoutButtonBox type = "view-buttons-container">
          { ( isDisciplinePrepare || isTournamentPrepare || isLevelPrepare || isClear ) && <ChangeButtonFeature /> }
          <BackButtonFeature />    
        </LayoutButtonBox>

      ) 
    }

    </>
  )
}