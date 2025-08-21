import { useLocationHooks } from "../../../shared/hooks/useLocationHook";

import TourUnitFromUnit from "./tourUnitFromUnit";
import TourUnitFromTourUnit from "./tourUnitFromTourUnit";

const CreateTournamentUnit = () => {
  const { fromPathname  } = useLocationHooks()
  return (
    <>
      { fromPathname === "current_unit" &&  <TourUnitFromUnit /> }
      { fromPathname === "tournament_unit" && <TourUnitFromTourUnit /> }
    </>
  )
}

export default CreateTournamentUnit