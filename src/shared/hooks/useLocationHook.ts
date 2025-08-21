import { useLocation } from "react-router-dom"

export const useLocationHooks = () => {

  const location = useLocation()  
  const pathname = location.pathname.split('/')[3]
  const pathnameType = location.pathname.split( '/' )[2]
  const locationState = location.state
  const statusLocationState = !!locationState && !!locationState.from
  const statusLocationPath = statusLocationState && locationState.from.pathname === pathname ? pathname : null
  const currentNodeId: string | "" = statusLocationState && statusLocationPath ? locationState.from.id : ""
  const titleMod = currentNodeId ? "Изменить " : "Созать "
  const fromPathname = statusLocationState ? locationState.from.pathname : ""
  const fromId = statusLocationState ? locationState.from.id : ""

  const createNewData = !statusLocationState;
  const createDatafromData = statusLocationState && !statusLocationPath
  const saveChangeData = statusLocationState && statusLocationPath && currentNodeId


  return {
    titleMod, 
    
    currentNodeId, fromId,

    pathname, pathnameType, fromPathname, 
    
    createNewData, createDatafromData, saveChangeData,
    
    locationState, statusLocationPath, statusLocationState,

  }
}