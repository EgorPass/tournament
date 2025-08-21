import { FC, ReactNode, useEffect, useState } from "react"
import { RollerDB } from "../config/indexedDB"
import { ContextOfflineDBProvider } from "./contextOfflineDBProvider"

import { initialStructureForDB } from "../config/initialStructureFofDB"


const DefaultLoader = () => (
  <div
    style = { {
      width: "100wh",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <p>
      ...Один момент пожалуйста!!!
    </p>
  </div>
)

const OfflineDBProvider: FC<{children: ReactNode }> = ( { children }  ) => {  
  const [isLoading, setIsLoading] = useState<boolean>( true )
  const [db, setDB ] = useState<RollerDB | null>( null )
  const [error, setError ] = useState<boolean>(false)
  
  useEffect( () => {
    ( async() => {
      const db = await new RollerDB( "tournament_DB", 1).openDB( initialStructureForDB )
      if( db ) {
        setDB( db )
      }
      else {
        setError( true )
      }
      setIsLoading( false )
    })()

  } 
    , [ ]
  )
  if(isLoading) return (
    <DefaultLoader />
  )
  else if( error ) return (
    <div> error............</div>
  )
  else return (
    <ContextOfflineDBProvider.Provider value = { db } >
      { children }
    </ContextOfflineDBProvider.Provider>
  )
}

export default OfflineDBProvider