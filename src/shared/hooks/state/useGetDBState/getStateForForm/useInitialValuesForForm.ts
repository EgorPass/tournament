import { emptyStateForForm } from "../../../../lib/initialState/emptyStateForForm"

import { useQuery } from "@tanstack/react-query"
import { useLocationHooks } from "../../../useLocationHook"
import { ITournamentPlayer, ITournamentPlayerResult, ITournamentUnitDiscipline } from "../../../../../types"
import { useDBGetMethods } from "../../../../store/offlineDB/model/useDBGetMethods"

export const useInitialValuesForForm = ( ) => {
  // console.log( "use create layout hook for get data .....>>>>>")
  const { getItemFromDB, getItemsFromDB } = useDBGetMethods()
  const { pathname, currentNodeId, fromPathname, fromId } = useLocationHooks()
  
  // console.log( "fromPathname", fromPathname )
  console.log( "pathname", pathname )
  console.log( "fromId", fromId )
  // console.log( "currentNodeId", currentNodeId )

  
  const { data } = useQuery({
    queryKey: [ 
      "create-layout",
      pathname,
      { id: currentNodeId } 
    ],
    queryFn: async()=> {
      // console.log( "before get request ")
      const item = await getItemFromDB( pathname, "id", !!currentNodeId ? String( currentNodeId ) : "fuck you Spilberg!!"  ) 
      // console.log( "after get request ")
      // console.log( "item", item )
        if( pathname === "tournament_unit") {
          if( fromPathname === "tournament_unit" ) {

            const list = await getItemsFromDB<ITournamentUnitDiscipline>( "tournament_unit_discipline", "tournament_unit_id", !!currentNodeId ? String( currentNodeId ) : "fuck you Spilberg!!" )
            return { list, unit: item }
          }
          else if( fromPathname === "current_unit") {
            // console.log( "get tour_unit_disc for unit...........")
            const list = await getItemsFromDB<ITournamentUnitDiscipline>( "tournament_unit_discipline", "current_unit_id", fromId )
            return { list, unit: undefined }
          }
        }
        else{
          const res = item ? item : {}
          // console.log( "res at create",  res )
          return res 
        }
    },
    staleTime: 0,
  })
  const setInitialValuesForForms = (state: { [key: string]: any } | unknown ) => {
    // console.log( " state at create ", state )
    const cool = typeof state === "object" && Object.keys( state! ).length
    if( !cool ) return emptyStateForForm.getState( pathname )
    else return state 
  }
  return { 
    initialValues: setInitialValuesForForms( data )
  }
}
