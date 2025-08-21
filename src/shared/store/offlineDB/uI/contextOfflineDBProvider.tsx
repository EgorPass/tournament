import { createContext, useContext } from "react";
import { RollerDB } from "../config/indexedDB";

export const ContextOfflineDBProvider = createContext<RollerDB | null>( null )
export const useOfflineDBContextConsumer = () => useContext( ContextOfflineDBProvider )
