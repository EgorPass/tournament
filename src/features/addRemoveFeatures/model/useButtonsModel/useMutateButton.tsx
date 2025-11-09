import { QueryKey, useMutation, useQueryClient  } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

type TQKey =  ( string | { [key: string]: string } )[]

type TState = {
   from: {
        id: string,
        pathname: string,
      }
} | null

type TFuncProp = {
  dirname: string,
  state: TState,
  replace?: boolean,
  queryKey?: Array<TQKey>
}

type IFunc = (values?: any) => Promise<TFuncProp>

interface IProp {
  func: IFunc,
}

export const useMutateButton = ({ func }: IProp) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient() 
  
  return useMutation({
    mutationFn: func,
    onMutate: async() => {
      // await queryClient.invalidateQueries()  // не работает 
    },
    async onSettled(data, error, variables, context) {
      if( error ) {
        console.log( error )
      }
      let state: TState = null
      let dirname: string = "/"
      let replace: boolean = false
      let queryKey: Array<TQKey> = []
      if( data ) {
        replace = !!data.replace
        dirname =  data.dirname
        state = data.state
        queryKey = "queryKey" in data ? queryKey : []

        if( queryKey.length > 0 ) {
          await queryClient.invalidateQueries({ queryKey })
        }
        await queryClient.invalidateQueries()
        
        // if( data.queryKey ) {
          // for( let i = 0, len = data.queryKey.length; i< len; i++ ) {
          //   const keys = data.queryKey[ i ]
          //   console.log( keys )
          //   await queryClient.refetchQueries( { 
          //     queryKey: [ ...keys ] 
          //   })
          // }
        // }
      }
      await queryClient.invalidateQueries()
      navigate( dirname, { state, replace } )
    },
  })
}