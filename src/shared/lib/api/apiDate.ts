import { apiCheck } from "./apiCheck"

type TDate = string | number
type TTimeItem = undefined | string | number
type TTimeData = { hours?: TTimeItem, min?: TTimeItem, sec?: TTimeItem, ms?: TTimeItem }

export const apiDate = {
  mounths: [
    "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ],
  setLocaleDate( date: string ) {
    const currentDate = new Date( date )
    return `${ currentDate.getDate() } ${ this.mounths[ currentDate.getMonth() ] } ${ currentDate.getFullYear() }`
  },
  dateCompare( x: TDate, y: TDate ) {
    if( typeof x === "string" && typeof y === "string") {
      return Date.parse( x ) - Date.parse( y as string )
    }
    else if( typeof x === "string" && typeof y === "number") {
      return  Date.parse( x ) - y
    }
    else if( typeof x === "number" && typeof y === "string" ) {
      return x - Date.parse( y )
    }
    else return 0
  },
  setLeftDays( date: string ): string  {
    const diff = this.dateCompare( date, Date.now() )
    if(diff < 0) return "время вышло"
    else{
      const days = Math.floor( diff / 1000 / 60 / 60 / 24)  
      return `осталось ${ days } ${ this.daysLetters( days ) }`
    }
  },
  getAge( bornDate: string, actualDate: string | Date | undefined ): string {
    if( actualDate ) {

      if( actualDate instanceof Date ) {
        return String( 
          ( +actualDate.getFullYear() - +bornDate.split("-")[0] ) 
        )
      }
      if( typeof actualDate === "string" ) {
        return String(
          ( +actualDate.split("-")[0] - +bornDate.split("-")[0] ) 
        )
      }
    }
    return ""
  },
  daysLetters( date: number ): string {
    let day: string = ""
    const buf = Number( (date + "").slice( -1 ) )
    if( buf === 1 ) day = "день"
    if( buf > 1 && 5 > buf) day = "дня"
    else day = "дней"
    return day
  },
  getYearLetters( year: string ) {
    let letters: string = "лет"
    if( +year > 10 && 20 > +year ) {
      letters = "лет"
    }
    else {
      const buf = Number(  year.slice(-1) )
      if( buf === 1 ) letters = "год"
      if( buf > 1 && 5 > buf ) letters = "года"
      else letters = "лет"
    }
    return letters
  },

  getTimeMs( {min = 0, sec = 0, ms = 0}: TTimeData ) {
    const time_ = new Date( 0 )
    time_.setUTCMinutes( +min, +sec, +ms )
    // console.log( time_.getTime() )
    return time_.getTime()
  },
  convertMsInTime( time: number ) {
    if( !( apiCheck.isNumber( time ) ) ) return "" 

    const date = new Date( 0 )
          date.setUTCMilliseconds( time )
          
    const resMin = ( "00" + ( date.getUTCMinutes() ) ).slice( -2 )
    const resSec = ( "00" + date.getUTCSeconds() ).slice( -2 )
    const resMs = ( "000" + date.getUTCMilliseconds() ).slice( -3 )
    const currentHours = ( "00" + ( ( ( date.getUTCDate() - 1 ) * 24 ) + date.getUTCHours() ) ).slice( -2 ) 
          
    return `${currentHours}:${ resMin }:${ resSec }:${ resMs }`
  },
  getResultToReiting( time: number ) {
    if( apiCheck.isNumber( time )) {
      const arr = this.convertMsInTime( time ).split(":")
      const state = +arr[0] > 0

      const newArr = arr.filter( ( it, i ) => {
        if( i < 2 ) {
          if( ( i === 0 ) && state ) return it
          if( ( i === 1 ) && ( +it > 0 || state ) ) return it
        }
        else return it 
      })

      return newArr.join(":")
    }
    else return ""

  }

}