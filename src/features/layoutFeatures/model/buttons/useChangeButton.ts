import { useNavigate } from "react-router-dom"
import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"

export const useChangeButton = () => {
  const navigate = useNavigate()
  const { pathname, locationState, statusLocationState, titleMod } = useLocationHooks()

  const redirect = ( ) => {
    const target = pathname === "unit_list" ? "current_unit" : pathname === "tournaments" ? "tournament" : pathname
    
    navigate( `/api/create/${ target! }`, {state: { from: ( statusLocationState ? locationState?.from : null ) } } )
  }

  return { redirect, titleMod }
}