import { emptyStateForForm } from "../../../../lib/initialState/emptyStateForForm"

import { useQuery } from "@tanstack/react-query"
import { useLocationHooks } from "../../../useLocationHook"
import { ITournamentUnitDiscipline } from "../../../../../types"
import { useDBGetMethods } from "../../../../store/offlineDB/model/useDBGetMethods"

export const useInitialValuesForForm = ( ) => {
  const { getItemFromDB, getItemsFromDB } = useDBGetMethods()
  const { pathname, currentNodeId, fromPathname, fromId } = useLocationHooks()
  
  const { data } = useQuery({
    queryKey: [ 
      "create-layout",
      pathname,
      { id: currentNodeId } 
    ],
    queryFn: async()=> {
      const item = await getItemFromDB( pathname, "id", !!currentNodeId ? String( currentNodeId ) : "fuck you Spilberg!!"  ) 
      if( pathname === "tournament_unit") {
        if( fromPathname === "tournament_unit" ) {

          const list = await getItemsFromDB<ITournamentUnitDiscipline>( "tournament_unit_discipline", "tournament_unit_id", !!currentNodeId ? String( currentNodeId ) : "fuck you Spilberg!!" )
          return { list, unit: item }
        }
        else if( fromPathname === "current_unit") {
          const list = await getItemsFromDB<ITournamentUnitDiscipline>( "tournament_unit_discipline", "current_unit_id", fromId )
          return { list, unit: undefined }
        }
      }
      else{
        const res = item ? item : {}
        return res 
      }
    },
    staleTime: 0,
  })
  const setInitialValuesForForms = (state: { [key: string]: any } | unknown ) => {
    const cool = typeof state === "object" && Object.keys( state! ).length
    if( !cool ) return emptyStateForForm.getState( pathname )
    else return state 
  }
  return { 
    initialValues: setInitialValuesForForms( data )
  }
}
