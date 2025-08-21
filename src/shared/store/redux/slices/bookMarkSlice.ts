import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBookMark } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../hooks";

// const initialState: string = "play"
const initialState: string = "reiting"

export const { actions : { setBookMark }, reducer: bookMark } = createSlice({
  name: "bookMark",
  initialState,
  reducers: {
    setBookMark: {
      prepare: ( cool: TBookMark ) => ( { payload: cool  } ),
      reducer: ( state: string, action: PayloadAction<TBookMark> ) => action.payload
    }
  }
})

export const useGetBookMark = () => {
  return useAppSelector( state => state.bookMark )
}

export const useSetBookMark = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators( { setBookMark }, dispatch )
}
