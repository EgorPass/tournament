import { useGetThemeStore, useSetTheme } from "../../../shared/store/redux/slices/themeSlice"

export const useThemeButton = () => {
  const setTheme = useSetTheme()
  const themeStore = useGetThemeStore()
  return { themeStore, setTheme, }
}