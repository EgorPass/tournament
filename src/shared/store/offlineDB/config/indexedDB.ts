type TDbInitialKey = Array<{name: string, index: string[]}>
type TInitOpt = { [keyPath: string] : string | boolean}
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
  openDB(dbInitialKey: TDbInitialKey ): Promise<RollerDB>
  getItems<T>( storeName: string, field: string, key: string, fiterField?: string, filterKey?: string ): Promise<T[]>
  getItem<T>( storeName: string, field: string, key: string ): Promise<T | undefined > 
  changeDBData<T>(action: "add" | "change" | "remove", storeName: string, data: T | T[]): Promise<T[]>
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
  private prepareTransaction(storeName: string, mode: "readwrite" | "readonly" ) {
    let store: IDBObjectStore | null = null
    let transaction: IDBTransaction | null = null
    try{
      transaction = this.db.transaction( storeName, mode )
      store = transaction.objectStore(storeName)
    }
    catch( err ) {
      transaction = null ; store = null 
      // return err
    }
    return { transaction, store }
  }
  private openCursor( store: IDBObjectStore, field?: string, key?: string, fiterField?: string, filterKey?: string ) {
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
              if( fiterField && filterKey ) {
                if( 
                  fiterField in cursor.value &&
                  cursor.value[ fiterField ] === filterKey 
                ) {
                  res( cursor )
                }
                cursor.continue()
              }
              else {
                res( cursor )	
                cursor.continue();	
              }
            }
            else res( { done: true, value: undefined } );
          }
          request.onerror = ( e: Event ) => rej( e )
        })
      }
    }

    return gen()
  }
  private getIndexDataFromDB<T>( store: IDBObjectStore, field: string, key: string ) {
    return new Promise<T>( (res, rej ) => {
      const index = store!.index(field)
      const request = index.get(key) as IDBRequest<T> // IDBIndex
      request.onsuccess = (e: Event ) => {
        const { result } = e.target as IDBRequest
        res( result as T )
      }
      request.onerror = (e) => {
        rej( e )
      }
    })
  }
  private actionForDBData<T>( action: string, item: T, store: IDBObjectStore ) {
    let requestResult: IDBRequest<any>
    
      if( isIdInData( item ) ) {
        switch( action ) {
          case "add": requestResult = store.add( item ); 
          break;
          case "change": requestResult = store.put( item )
          break;
          case "remove": requestResult = store.delete( item.id  )
          break;
        }
      }

    return new Promise<T> ( async(res, rej ) => {
      requestResult.onsuccess = (e) => {

        res( item )
      }
      requestResult.onerror = ( err ) => {
        rej( err )
      }
    })
  }
  private promisifyMethod<RT>( storeName: string, mode: "readwrite" | "readonly", func: ( store: IDBObjectStore ) => Promise<RT> ) {

    return new Promise<RT>( async (res, rej) => {
      const { store, transaction } = this.prepareTransaction( storeName, mode )
      if( transaction && store ) {
        try{
          let data: RT
          transaction.oncomplete = () => { 
            // console.log( "transaction at", storeName, "complite" )
            res( data! ) 
          }
          data = await func( store )
        }
        catch( err ) {
          rej( err )
        }
      }
    })
  }

  getItem<T>( storeName: string, field: string, key: string ) {
    return this.promisifyMethod<T>( storeName, "readonly", async( store ) => {
      return await this.getIndexDataFromDB<T>( store, field, key )
    })
  }
  getItems<T>(storeName: string, field?: string, key?: string, fiterField?: string, filterKey?: string ) {
    return this.promisifyMethod<T[]>( storeName, "readonly", async( store ) => {
      const storeData: T[] =[]
      const generator = this.openCursor( store, field, key, fiterField, filterKey )
      for await( let data of generator ) {
        if( data.value ) storeData.push( data.value )
        else break;
      }
      return storeData
    })
  }
  changeDBData<T>(action: string, storeName: string, data: T | T[]) {
    return this.promisifyMethod<T[]>( storeName, "readwrite", async( store ) => {
      const sotreArrData: T[] = []
      if( Array.isArray( data ) ){
        const buff = data.map( it => this.actionForDBData<T>( action, it, store ))
        const result = await Promise.all( buff )
        sotreArrData.push( ...result )
      }
      else {
        const res = await this.actionForDBData<T>( action, data, store )
        sotreArrData.push( res )
      }
      return sotreArrData
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

}