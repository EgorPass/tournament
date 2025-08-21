import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// import { ormState } from './slices/ormSlice';
import { theme } from './slices/themeSlice';
import { sortList } from './slices/sortSlice';
import { loaderSpinner } from './slices/loaderSlice';
import { searchFilter } from './slices/searchFilterSlice';
import { bookMark  } from './slices/bookMarkSlice';
import { playerModalData } from './slices/playerModalData';
import { playerModalReiting } from './slices/playerModalReiting';
import { isVisibleMenu } from './slices/menuSlice';

const rootReducer = combineReducers( { theme, sortList,  loaderSpinner, searchFilter, bookMark, playerModalData, playerModalReiting, isVisibleMenu } )

export const store = configureStore({
  reducer: rootReducer, 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
