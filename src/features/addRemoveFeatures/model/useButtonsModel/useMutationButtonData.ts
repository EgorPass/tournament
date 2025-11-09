
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useDBGetMethods, useDBSetMethods } from "../../../../shared/store/offlineDB"
import { useRemoveTournamentUnitWithLuftList } from "../useRemoveTournamentUnitWithLuftList"
import { useClearTournamentUnitDiscipline } from "../useClearTournamentUnitDiscipline"
import { useNavigate } from "react-router-dom"

export const useMutationButtonData = () => {
  const { currentNodeId, pathname } = useLocationHooks()
  const { removeFromDB, changeAtDB, addToDB  } = useDBSetMethods()
  const { getItemFromDB, getItemsFromDB } = useDBGetMethods()
  const removeTournamentUnit = useRemoveTournamentUnitWithLuftList()
  const removeTourUnitDiscipline = useClearTournamentUnitDiscipline()
  const navigate = useNavigate()
  
  const navTo = (to: string, id: string ) => {
    const state = !id ? null : ({
      from: {
        id,
        pathname: to,
      }
    })

    navigate( `/api/view/${to}`, { state, replace: true })
  }

  return { 
    currentNodeId, pathname, navTo,
    removeFromDB, addToDB, changeAtDB,
    getItemFromDB, getItemsFromDB,
    removeTourUnitDiscipline, removeTournamentUnit
  }
}