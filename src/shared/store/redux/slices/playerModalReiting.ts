import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../hooks"
import { IPlayerModalReiting } from "../../../../types"

type TActionData = Omit<IPlayerModalReiting, "status">

const initialState = {
  status: false,
  player_id: "",
  discipline_id: ""
} as IPlayerModalReiting

export const { actions: { setPlayerModalReiting }, reducer: playerModalReiting } = createSlice({
  name: "playerModalData",
  initialState,
  reducers: {
    setPlayerModalReiting: {
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

export const useSetPlayerModalReiting = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators( { setPlayerModalReiting }, dispatch )
}

export const useGetPlayerModalReiting = () => {
  return useAppSelector( state => state.playerModalReiting )
}