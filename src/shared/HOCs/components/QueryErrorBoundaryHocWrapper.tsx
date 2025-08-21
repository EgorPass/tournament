import { FC, Fragment } from "react"
import { QueryErrorResetBoundary, QueryErrorResetFunction, useQueryClient } from "@tanstack/react-query"
import { ReactNode } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { MainHeader } from "../../../widgets/headerWidgets/components/mainHeader"


const ErrorComponent:FC<{children?: ReactNode}> = ( {children} )  => {
  return (
    <Fragment>
      errorrr....................
      {/* <MainHeader firstTitle = "У нас произошла ошибка" /> 
      <GroupContentWrapper>
        <div style = {{textAlign: "center"}}>
          Жмём назад, и пробуем ещё разок!!!
        </div>
        <div>
          { children }
        </div>
      </GroupContentWrapper> */}
    </Fragment>
  )
}

export const QueryErrorBoundaryHocWrapper: FC<{children: ReactNode}> = ( { children } ) => {

  const queryClient = useQueryClient()

  return (
    <QueryErrorResetBoundary>
      {
        ({reset}) => (
          <ErrorBoundary
            onReset = { reset }
            FallbackComponent =  { ({resetErrorBoundary}) => {
              // queryClient.invalidateQueries()
              return (
                <Fragment>
                  errorrr....................
                {/* <MainHeader firstTitle = "У нас произошла ошибка" /> 
                <GroupContentWrapper>
                  <div style = {{textAlign: "center"}}>
                    Жмём назад, и пробуем ещё разок!!!
                  </div>
                  <button onClick={ resetErrorBoundary }>
                    { children }
                  </button>
                </GroupContentWrapper> */}
              </Fragment>
              )
            } 
          }
          >
            { children }
          </ErrorBoundary>
        )
      }
    </QueryErrorResetBoundary>
  )
}