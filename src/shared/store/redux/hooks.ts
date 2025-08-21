// import { orm } from './models/models';
// import { createSelector } from 'redux-orm';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/////////////////////////////////////////////////////////////////////////


// export const useGetLoadingData = () => {
// 	return useAppSelector( state => state.loadingData )
// }

//////////////// Redux - orm selectors //////////////////////////

// const useGetOrmStore = () => {
// 	return useAppSelector( state => state.ormState )
// }

// export const useGetOrmModelSession = (field: string) => {
// 	const getSelector = createSelector( 
// 		orm,
// 		( session ) => {
// 			return session[field]
// 		},	
// 	)
// 	return getSelector( useGetOrmStore() )
// }

// export const useGetOrmState = ( field: string ) => {	
// 	const getSelector = createSelector( 
// 		orm,
// 		( session ) => {
// 			// есть для querySet возможность orderBy - нужно попробывать сдесь.
// 			return session[field].all().toModelArray().map( item => {
// 				const { ref } = item
// 				return {
// 					...ref,
// 					orm: item
// 				}

// 			})
// 		},	
// 	)
// 	return getSelector( useGetOrmStore() )
// }

// export const useGetFieldById = ( field: string, id: string ) => {
// 	const getSelector = createSelector(
// 		orm,
// 		session => {
// 			const query = session[ field ].withId( id as never )
// 			return query
// 		}
// 	)
// 	return getSelector( useGetOrmStore() )
// } 

// export const useGetFieldsByMatch = ( field: string, matchObj: any) => {
// 	const getSelector = createSelector(
// 		orm,
// 		( session ) => {
// 			return session[ field ].filter( matchObj ).all().toModelArray().map( item => {
// 				const { ref } = item
// 				return { 
// 					...ref, 
// 					orm: item,
// 				}
// 			})
// 		}
// 	)
// 	return getSelector( useGetOrmStore() )
// }

// export const useGetOneFieldByMatch = ( field: string, matchObj: any) => {
// 	console.log( matchObj )
// 	const getSelector = createSelector(
// 		orm,
// 		( session ) => {
// 			const query = session[ field  ].get( matchObj )
// 			return query 
// 		}
// 	)
// 	return getSelector( useGetOrmStore() )
// }

/// selectors by pages //////////////////////
