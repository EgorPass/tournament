import {  MouseEvent } from "react"
import { useReset } from "./useReset"

export const useResetImportButton = () => {
  const reset = useReset()
  return (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    reset()
  }

}