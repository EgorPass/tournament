import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const { actions : { setSearchFilter } , reducer: searchFilter } = createSlice({
  name: "searchFilter",
  initialState: "",
  reducers: {
    setSearchFilter: {
      prepare: ( cool: string ) => ( { payload: cool } ),
      reducer: ( state: string, action: PayloadAction<string> ) => action.payload
    }
  }
})