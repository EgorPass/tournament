import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TimerSpan } from "../components/wrappers"

export const Timer = () => {
  const navigate = useNavigate()
  const [ time, setTime ] = useState<number>(10)

  const func = () => {
    setTime( prev => prev - 1 )
  }

  useEffect( () => {
    if( time > 0 ) {
      setTimeout( () => {
        func()
      }, 1000 )
    }


    else if( time <= 0 ) {
      navigate( "/", { state: null, replace: true } )
    }

  }
    , [ time ]
  )


  return (
    <TimerSpan>{ time }</TimerSpan>
  )
}