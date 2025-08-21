import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orm } from "../models/models";
import { SessionBoundModel } from "redux-orm";
import { useAppDispatch } from "../hooks";

interface IData {
  id: string
  [key: string]: string | boolean | number | object
}

interface IPayloadAction {
  field: string,
  data: IData | Array<IData> 
  type?: "add" | "update" | "remove"
}

const initialState = orm.getEmptyState();

export const { actions: { changeStore }, reducer: ormState } = createSlice({
  name: "ormState",
  initialState,
  reducers: {
    changeStore: {
      prepare:( {field, data, type }) => ( { payload: { field, data, type } } ),
      reducer: setReducer( (session: any, action: PayloadAction<IPayloadAction> ) => {
        const field = action.payload.field
        const data = action.payload.data
        const type = action.payload.type

        const field_ = field[ 0 ].toUpperCase() + field.slice( 1 )
        
        if( Array.isArray( data ) ) for( let item of data )  changeItem( item )
        else changeItem( data )
        
        function changeItem( item: IData ) {
          switch ( type ) {
            case "add" : session[ field_ ].create( item )
              break;
            case "update": session[ field_ ].upsert( item ) 
              break;
            case "remove": session[ field_ ].all().filter( ( it: SessionBoundModel ) => it.id === item.id ).delete()
              break;
          } 
        }

      }) 
     },

  }
})

function setReducer( reducer: Function ) {
  return ( state: typeof initialState, action: PayloadAction<any>) => {
    const session = orm.session( state )
    reducer( session, action )
    return session.state as unknown as typeof state
  }
}

export const useSetChangeStore = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators( { changeStore } ,dispatch )
}