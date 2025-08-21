import { useEffect } from "react"
import { useRFFState } from "../model/useRFFState"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"

export const ResetComponentToLoad = () => {

  const { form, formState } = useRFFState()
  const { pathname, pathnameType } =  useLocationHooks()

  useEffect( () => {
    form.reset( formState.initialValues )
  }
    , [ pathname, pathnameType ]
  )

  return <></>
}