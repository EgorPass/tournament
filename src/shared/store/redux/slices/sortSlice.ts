import { createSlice, bindActionCreators, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../hooks"

const initialState = {
  tournament: "family",
  // reiting: "reitingTree"
  reiting: "levelTree"
}

export const { actions: { setTournamentSortType, setReitingSortType }, reducer: sortList } = createSlice({
  name: "sortList",
  initialState,
  reducers: {
    setTournamentSortType: {
      prepare: (sortField: string ) =>( { payload : sortField } ),
      reducer: (state, action: PayloadAction<string>) => (
        { ...state, tournament: action.payload }
      )
    },
    setReitingSortType: {
      prepare: ( sortField: string ) => ( {payload: sortField } ),
      reducer: ( state, action:PayloadAction<string>  ) => (
        { ...state, reiting: action.payload }
      )
    }
  }
})

export const useSetSortList = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators( {setTournamentSortType, setReitingSortType }, dispatch )
}

export const useGetSortListStore = ( ) => {
  return useAppSelector ( state => state.sortList )
}