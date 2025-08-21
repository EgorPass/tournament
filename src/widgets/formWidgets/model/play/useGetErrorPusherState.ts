import { useFormState } from "react-final-form"


export const useGetErrorPusherState = ( condition: string, id: string, idx?: string) => {
  const formState = useFormState()
  const { results } = formState.values 

  // console.log( formState.values )

  const playerData = !results 
                      ? null
                        : !!idx && ( idx in results ) && ( id in results[ idx ] ) 
                          ? results[ idx ][ id ].results
                          : ( id in results ) 
                            ? results[ id ].results
                            : null

  return playerData 
              ? ( condition === "time"
                ? ( !!playerData.ms || !!playerData.sec || !!playerData.min ) 
                : ( !!playerData.point ) 
              )
              : false
}