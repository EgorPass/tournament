import { FC } from "react"
import { DQTypes } from "../../../../../types"
import { FieldArray } from "react-final-form-arrays"
import { ErrorWrapper, FieldArrayWrapper, ResultRowWrapper } from "../Wrappers"
import { FieldArrayRemoveFeature } from "../../../../../features/formFeatures/ui/FieldArrayRemoveFeature"
import { RadioItem } from "../../../../../shared/components/inputFields/radioBoxItem"
import { InputText } from "../../../../../shared/components/inputFields/inputText"

export const PlayerDQRow:FC<{ name: string, dqList: DQTypes[] }> = ({ name, dqList } ) => (
  <FieldArrayWrapper>
    <FieldArray name = { name }>
      { (props) => (
          props.fields.map( (name, index ) => (
            <ErrorWrapper key = { name + "_" + index }>
              <ResultRowWrapper>
                <h6>Штраф</h6>
                <div>
                { 
                  dqList.map( ( it, index ) => (
                    <RadioItem
                      key = { it.name + "-" + index }
                      value = { it.name }
                      name = { `${ name }.name` }
                      title = { `${ it.name } ${ it.description }`}
                      valid = { true }
                    />
                  ))}
                  <div>
                    <InputText
                      name = { `${ name }.desc` }
                      placeholder = "описание"
                      valid = { true }
                    />
                  </div>
                </div>
              </ResultRowWrapper>
              <FieldArrayRemoveFeature 
                justify = "end"
                callback = { (e) => {
                  e.preventDefault();
                  props.fields.remove(index)
                } }
              />
            </ErrorWrapper>
          ))
        )
      }
    </FieldArray>
  </FieldArrayWrapper>
)