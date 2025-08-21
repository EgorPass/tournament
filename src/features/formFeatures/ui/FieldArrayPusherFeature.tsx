import { FC } from "react"
import { useForm } from "react-final-form"
import { StyledFormRowButtonContainer } from "../components/StyledFormRowButtonContainer"

interface IProp {
  name: string,
  pushTitle: string,
  mutatorField: {[key: string]: string | string[] }
}

export const FieldArrayPusherFeature: FC<IProp> = ( { name, mutatorField, pushTitle }) => {
  const form = useForm() 
  return (
    <StyledFormRowButtonContainer
      $aling = "end" 
      $just = "end"
      key = { name }
    >
      <span 
        onClick={ ()=> { 
          form.mutators.push( name, mutatorField ) } }
      >{ pushTitle }</span>
    </StyledFormRowButtonContainer>
  )
}