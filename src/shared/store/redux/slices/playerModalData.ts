import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../hooks"
import { IPlayerModalData } from "../../../../types"


type TActionData = Omit<IPlayerModalData, "status">

const initialState = {
  status: false,
  gender: "",
  category: "",
  playersId: [] as string[],
  position: 0
} as IPlayerModalData

export const { actions: { setPlayerModalData }, reducer: playerModalData } = createSlice({
  name: "playerModalData",
  initialState,
  reducers: {
    setPlayerModalData: {
      prepare: ( data: TActionData | null ) => ({ payload: data }),
      reducer: (state, action: PayloadAction<TActionData | null>) => {
        const data = action.payload
        if( data ) {
          return { status: true, ...data } //as typeof state
        }
        if( !data ) {
          return { ...initialState, status: false }

        }
        else {
          return state 
        }
      }
    }
  }
})

export const useSetPlayerModalData = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators( { setPlayerModalData }, dispatch )
}

export const useGetPlayerModalData = () => {
  return useAppSelector( state => state.playerModalData )
}