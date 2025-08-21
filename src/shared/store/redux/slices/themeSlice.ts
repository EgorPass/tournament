import { PayloadAction, createSlice, bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../hooks"

export const { actions: {setTheme} , reducer: theme } = createSlice ({
  name: "theme",
  initialState: "light",
  reducers: {
    setTheme: {
      prepare: ( theme: string ) => ({
        payload: theme
      }),
      reducer: (state, { payload } : PayloadAction<string>) => {
        console.log( payload )
        return payload
      }
    }
  }

})

export const useSetTheme = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(setTheme, dispatch)
}

export const useGetThemeStore = ( ) => {
  return useAppSelector( state => state.theme)
}