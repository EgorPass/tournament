import React, { ReactNode, Suspense, FC, ElementType } from "react"
import { QueryErrorBoundaryHocWrapper } from "../components/QueryErrorBoundaryHocWrapper"

export const SuspenseWrapper: FC<{children: ReactNode}> = ({children }) => {
  return (
    <QueryErrorBoundaryHocWrapper>
      <Suspense 
        // fallback = { <LoaderSpinner /> }
      >
        {children}
      </Suspense>
    </QueryErrorBoundaryHocWrapper>
  )
}

export const suspenseHOCWrapper = ( WrappedComponent: ElementType ) => {
  return function ( props: any  ) {
    return (
      <SuspenseWrapper>
        <WrappedComponent { ...props } />
      </SuspenseWrapper>
    ) 
  } 
}
