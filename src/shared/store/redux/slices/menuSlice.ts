import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

const initialState = false

export const { actions : { setisVisibleMenu }, reducer: isVisibleMenu } = createSlice({
  name: "isVisibleMenu",
  initialState,
  reducers: {
    setisVisibleMenu: {
      prepare: ( cool: boolean ) => ( { payload: cool  } ),
      reducer: ( state: boolean, action: PayloadAction<boolean> ) => action.payload
    }
  }
})

export const useGetIsVisibleMenu = () => {
  return useAppSelector( state => state.isVisibleMenu )
}

export const useSetIsVisibleMenu = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators( { setisVisibleMenu }, dispatch )
}
