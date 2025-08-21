import { useContext, createContext } from "react"
import { IModalPlayerLayoutConsummer, IPLayLayoutContext, TDataToTreeModalForm } from "../../../types"

export const ContextPlayLayoutProvider = createContext<IPLayLayoutContext | null >( null )
export const usePlayLayoutContextConsumer = () => useContext( ContextPlayLayoutProvider )


export const ContextModalPlayLayoutProvieder = createContext<IModalPlayerLayoutConsummer | null>( null)
export const useModalPlayLayoutContextConsumer = () => useContext( ContextModalPlayLayoutProvieder )
