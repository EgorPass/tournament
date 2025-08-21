import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const { actions : { setLoaderSpinner }, reducer: loaderSpinner } = createSlice({
  name: "loaderSpinner",
  initialState: false,
  reducers: {
    setLoaderSpinner: {
      prepare: ( cool: boolean ) => ( { payload: cool  } ),
      reducer: ( state: boolean, action: PayloadAction<boolean> ) => action.payload
    }
  }
})
