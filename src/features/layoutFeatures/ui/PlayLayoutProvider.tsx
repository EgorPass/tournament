import { ReactNode } from "react";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { ContextPlayLayoutProvider } from "../model/contextPlayLayoutProvider";
import { usePlayLayoutProvider } from "../model/usePlayLayoutProvider";

export const PlayLayoutProvider= suspenseHOCWrapper(
  ( { children }: { children: ReactNode } ) => {
    // console.log( "1 - play layout provider ...")
    const { data , isSuccess } = usePlayLayoutProvider()
    if( isSuccess )
    return (
      <ContextPlayLayoutProvider.Provider value = { data }>
        { children }
      </ContextPlayLayoutProvider.Provider>
    )
    else return null
  }
) 