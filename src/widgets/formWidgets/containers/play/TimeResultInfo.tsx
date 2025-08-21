import { FC, useEffect, useState } from "react"
import { useForm, useFormState } from "react-final-form"
import { apiDate } from "../../../../shared/lib/api/apiDate"


// контейнер для определения как начислять время

export const TimeResultInfo: FC<{id: string, idx?: string}> = ( { id, idx } ) => {

  const form = useForm()
  const formState = useFormState()
  const [ totalMs, setTotalMs ] = useState<any>( 0 )
  const [ totalSec, setTotalSec ] = useState<any>( 0 )
  const [ totalMin, setTotalMin ] = useState<any>( 0 )
  const [ totalHours, setTotalHours ] = useState<any>( 0 )
  

  const data = !!idx 
                ? formState.values?.results?.[ idx ]?.[ id ]
                : formState.values?.results?.[ id ]


  let min = ( data && +data?.results?.min ) || 0
  let sec = ( data && +data?.results?.sec ) || 0
  let ms = ( data && +data?.results?.ms ) || 0
  const errors = ( data && data?.errors ) || []
  // console.log( ">>>> daata ", formState.values )

  useEffect( () => {
    if( errors && Array.isArray( errors ) ) {
      const totalErrors = errors.map( it => {
        return  ({
          min: !!it.min ? +it.min : 0,
          sec: !!it.sec ? +it.sec : 0,
          ms: !!it.ms ? +it.ms : 0,
        })
      })
      .reduce( ( acc, item ) => {
          const { min, sec, ms } = item 
          acc.min += min!;
          acc.sec += sec!;
          acc.ms += ms!
        
        return acc 
      } , { min: 0, sec: 0, ms: 0, point: 0 } as { min: number, sec:number, ms: number, point: number} )

      const { min: erMin, sec: erSec, ms: erMs,  } = totalErrors
  
      const time = apiDate.getTimeMs( {
        min: min + erMin,
        sec: sec + erSec,
        ms: ms + erMs,
      })
      const resTime = apiDate.convertMsInTime( time ).split( ":")
      setTotalHours( resTime[ 0 ] )
      setTotalMin( resTime[ 1 ] )
      setTotalSec( resTime[ 2 ] )
      setTotalMs( resTime[ 3 ] )
    }
  }
    , [  min, sec, ms, errors ]
  )

  useEffect( () => {
    const path = `results.${ !!idx ? idx + "." +id : id }.results`
    if( sec >= 60 ) {
      form.change( `${ path }.sec`, "59")
    }
  }
    , [  min, sec, ms  ]
  )

  return (
    <div>
      <span>{ totalHours }</span>
      <span> : </span>
      <span>{ totalMin }</span> 
      <span> : </span>
      <span>{ totalSec }</span> 
      <span> : </span>
      <span>{ totalMs }</span> 
    </div>
  )
}