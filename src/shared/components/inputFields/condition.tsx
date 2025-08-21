import { FC, ReactNode } from "react"
import { Field } from "react-final-form"

export const Condition: FC<{when: string, is: Array<string>, children: ReactNode}> = ({when, is, children}) => (
  <Field name = { when } subscription = { { value: true } } >
    { 
      ( { input: { value, name } } ) => { 
        let state: boolean = false 
        if( Array.isArray( value ) ) {
          state = value.filter( val => {
            return is.filter( it => it === val).length > 0
          }).length > 0
        }
        else {
          state = is.filter( it => it === value).length > 0
        }
        return ( state ? children : null ) 
      }
    }
  </Field>
)
