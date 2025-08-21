import { FC, ReactNode } from "react";
import { Field } from "react-final-form";

export const ConditionForEmpty: FC<{when: string, is: Array<string>, children: ReactNode}> = ({when, is, children }) => (
  <Field name = { when } subscription = { { value: true } }>
    {
      ( { input: { value, name } } ) => {
        let state = false
        if( Array.isArray( value ) ) state = is.some( itis => !value.includes( itis ) )
        else state = !is.includes( value )
        return ( state ? children : null )
      }
    }
  </Field>
)