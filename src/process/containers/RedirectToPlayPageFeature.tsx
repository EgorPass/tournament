import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useLocationHooks } from "../../shared/hooks/useLocationHook";

export const RedirectToPlayPageFeature:FC<{ to: string, redirect: boolean,  }> = ({ redirect, to }) => {
  const { locationState } = useLocationHooks()
  const path = redirect ? "/api/play/" : "/api/view/"
  return (
    <Navigate 
      to = { `${path}${to}`}
      state = { locationState }
      replace = { true }
    />
  )
}