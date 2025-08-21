
type TDbInitialKey = Array<{name: string, index: string[]}>
type TInitOpt = { [keyPath: string] : string | boolean}
type TGetObjectStore = {
  storeName: string, 
  mode: "readwrite" | "readonly", 
  callback: Function
}

type TPromisFromGen = IDBCursorWithValue | { done: boolean, value: undefined }

interface IData {
  id: string,
  [key: string]: string | number | object,
}

function isIdInData( data: any ): data is IData {
  if( "id" in data ) return true
  return false
}

export interface IRollerDB {
  // db: IDBDatabase
  openDB(dbInitialKey: TDbInitialKey ): Promise<RollerDB>
  getStoreDB<T>(  storeName: string ): Promise<T[]> 
  getItems<T>( storeName: string, field: string, key: string ): Promise<T[]>
  getItem<T>( storeName: string, field: string, key: string ): Promise<T> 
  changeDBData<T>(action: string, storeName: string, data: T | T[]): Promise<T[]>
}


export class RollerDB implements IRollerDB {
  db!:  IDBDatabase
  constructor( public name: string, public version: number ) {}

  // используем в this.openDB
  private storeInit( db: IDBDatabase, dbInitialKey: TDbInitialKey, opt: TInitOpt ) {
    dbInitialKey.forEach( initKey => {
      const store = db.createObjectStore( initKey.name, opt )
      initKey.index.forEach( index => {
        store.createIndex( index, index )
      })
    })
  }

  openDB( dbInitialKey: TDbInitialKey ) {
    let openRequest: IDBOpenDBRequest = window.indexedDB.open( this.name, this.version )
    return new Promise<RollerDB>( (res, rej) => {
      openRequest.onupgradeneeded = ( e ) => {
        // после выполнения срабатывает обработчик onSuccess
        // console.log( "new db need upgrade")
        const db = openRequest.result;
        // console.log( e.oldVersion ) // занчение версий
        if( e.oldVersion === 0 ) {
          this.storeInit( db, dbInitialKey, { keyPath: "id"} )
        }
        else if( e.oldVersion < this.version ) {
          // вариант для обнавления
          // бежим по dbInitialKey 
          // и если db.objectStoreNames.contains(initKey.name) будет false
          // то db.createObjectStore(initKey.name, {keyPath: 'id'});
        }
      }

      openRequest.onerror = (  ) => {
        const err = openRequest.error
        // console.log( "new db error", err )
        rej( err )
      }

      openRequest.onblocked = () => {
        // сработает если на другой вкладке изменилась версия
        // не даст работать.
        alert( "есть соединенеие с устаревшей версией")
        rej( new Error("заблокировали работу базы") )
      }

      openRequest.onsuccess = ( e ) => { 
        this.db = openRequest.result // это и есть теперь наша база
        // console.log( "new db success", this.db )

        this.db.onversionchange = () => {
          // сработает если на другой вкладке изменилась версия
          this.db.close();
          alert( "База данных устарела, перезагружай страниуц")
          rej( new Error("версия поменялась, Вас послали") )
        }

        res( this )
      }
    })
  }

  private getObjectStore({ storeName, mode = "readonly", callback}: TGetObjectStore ) {
    // try{
      const transaction = this.db.transaction( storeName, mode )
            transaction.oncomplete = () => {
              callback()
              // console.log( "close transaction")
            }
            transaction.onabort = () => {
              console.log( "transaction aboooooooooorrrrttt")
            }
            transaction.onerror = () => {
              console.log( "transaction erroooooooorrrr")
            }

      const store = transaction.objectStore(storeName)
      return store   
    // }
    // catch(err){
      // if( err instanceof Error ) {
      //   // console.log( err )
      //   throw new Error("неполадки с получением строы")
      //   // return err
      // }
      // throw new Error ( "неполадки с получением строы")
    // }
  }

  private openCursor( store: IDBObjectStore, field?: string, key?: string ) {
    let request: IDBRequest<IDBCursorWithValue | null>
    
    if( field && key ) {
      const index = store.index(field)
      request = index.openCursor( key )
    }
    else {
      request = store.openCursor()
    }
    
    async function *gen () {
      while ( true ) {
				yield new Promise<TPromisFromGen>( (res, rej) => {
					request.onsuccess = ( ) => {
						let cursor = request.result ;
						if( cursor) {
							res( cursor )	
							cursor.continue();	
						}
						else res( { done: true, value: undefined } );
					}
					request.onerror = ( e: Event ) => rej( e )
				})
			}
    }

    return gen()
  }

  // забор конкртеного хранилища
  getStoreDB<T>( storeName: string ) {
    return new Promise<T[]>( async( res, rej) => {
      let storeData: T[] = []
      try{
        const store = this.getObjectStore({ storeName, mode: "readonly" , callback: () => { 
          // console.log( "close transaction at getStore in", storeName )
          
          res( storeData ) 
        } } )
        const generator = this.openCursor( store )
        for await ( let data of generator ) {
          if( data.value ) storeData.push( data.value )
          else break
        }
      }
      catch( err ) {
        rej( err )
      }
    })
  }

  getItems<T>(storeName: string, field: string, key: string) {
    return new Promise<T[]>( async( res, rej) => {
      let storeData: T[] =[]
      try{
        const store = this.getObjectStore({ storeName, mode: "readonly" , callback: () => { 
          // console.log( "close transaction at getList in", storeName )
          
          res( storeData ) 
        } } )
        const generator = this.openCursor( store, field, key )
        for await( let data of generator ) {
          if( data.value ) storeData.push( data.value )
          else break;
        }
      }
      catch( err ) {
        rej( err )
      }
    })
  }

  getItem<T>( storeName: string, field: string, key: string ) {
    return new Promise<T>( async( res, rej) => {
			let storeData: T;
      let store: IDBObjectStore
      try{
        store = this.getObjectStore({ storeName, mode: "readonly" , callback: () => { 
          // console.log( "close transaction at getItem in", storeName )

          res( storeData ) },   } )
      }
      catch( err ) {
        rej( err )
      }
        
      const index = store!.index(field)
      const request = index.get(key) as IDBRequest<T> // IDBIndex
      
      request.onsuccess = (e: Event ) => {
        const { result } = e.target as IDBRequest
        storeData = result
      }

			request.onerror = (e) => {
				// if( e instanceof Error ) error = e
				rej( e )
				// throw new Error( "yb")
			}

		} )
  }

  changeDBData<T>(action: string, storeName: string, data: T | T[]) {
    return new Promise<T[]>( async( res, rej) => {
      const sotreData: T[] = []

      const addItem = ( store: IDBObjectStore, item: T ) => {
        if( isIdInData( item ) ) {
          switch( action ) {
            case "add": store.add( item ); 
            break;
            case "change": store.put( item )
            break;
            case "remove": store.delete( item.id  as IDBValidKey )
            break;
          }
          sotreData.push( item )
        }
      }

      try{ 
        const store = this.getObjectStore( {storeName, mode: "readwrite", callback: () => {
          // console.log( "close transaction ", action, "in", storeName )
					res( sotreData )
				}})
        if( Array.isArray( data ) ){
          // console.log( "isArray")
          data.forEach( it =>  addItem( store, it ) )
        } 
        else addItem( store, data )
      }
      catch( err ) {
        rej( err )
      }
    })
  }
}

