import { useNavigation } from "react-router-dom"
import { useEffect } from "react"
import { useIsFetching, useIsRestoring } from "@tanstack/react-query"
import { LoaderSpinner } from "../../shared/components/loaderSpinner/loaderSpinner"
import { useGetLoaderSpinner, useSetLoaderSpinner } from "../../features/loaderSpinnerFeature"

export const LoaderSpinnerWidget = () => {
  const navigate = useNavigation()
  const loaderSpinerState = useGetLoaderSpinner()
  const isFetching = useIsFetching()
  const { setLoaderSpinner } = useSetLoaderSpinner()
  // const isRestorting = useIsRestoring()

  // console.log( isFetching )
  // console.log( isRestorting )

  useEffect( () => {
    if( navigate.state === "loading" || isFetching  > 0 ) setLoaderSpinner( true )
    const state = navigate.state === "idle" && isFetching === 0
    
    if( state ) {
      setTimeout( () => {
        if( navigate.state === "idle" && isFetching === 0 )  setLoaderSpinner( false )
      }, 200)
    }

  }
    , [ navigate.state, setLoaderSpinner, isFetching   ]
  )

  return <>{ loaderSpinerState ? <LoaderSpinner /> : null }</>
}