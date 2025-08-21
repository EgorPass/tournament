import { FC } from "react"
import styled from "styled-components"
import { FieldArray } from "react-final-form-arrays"
import {  StyledGridListContainer } from "../../../../shared/components/groupComponents"
import { FieldArrayRemoveFeature } from "../../../../features/formFeatures"
import { GridItem } from "./gridItem"
import { InputText } from "../../../../shared/components/inputFields/inputText"
import { InputNumber } from "../../../../shared/components/inputFields/inputNumber"
import { RadioItem } from "../../../../shared/components/inputFields/radioBoxItem"
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem"

const DQTwoColComponent = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-areas: "leftSide rightSide"; */
  grid-template-columns: auto 30px;
`
const StyledDQListContainer = styled(StyledGridListContainer)`
  padding-left: 0;
`
const DQName = styled(GridItem)` 
  grid-template-columns: 25px 53px 221px;
  grid-column-gap: 5px;
  /* border: 1px dotted red; */
`  
const DQQuality = styled(GridItem)`
  grid-template-columns: 224px 41px 25px;
  grid-column-gap: 8px;
  /* border: 1px dotted red; */
`
export const DqItemsComponent: FC<{name: string}> = ({name}) => {
  return (
    <FieldArray name = { name }>
      {
        (props) => {
          console.log( props )
          return (
            props.fields.map( (name, index) =>(
              <StyledDQListContainer key = { name + "_" + index } >
                <DQName>
                  <span>DQ</span>
                    <InputText
                      name = {`${name}.name`}
                      placeholder = "FS"
                    />
                    <InputText 
                      name = {`${name}.description`}
                      placeholder = "описание"
                    />
                </DQName>
                <DQQuality>
                  <span>для дисквалификации</span>
                  <InputNumber
                    name = {`${name}.qual`}
                    placeholder="2"
                  />
                  <span>шт.</span>
                </DQQuality>
                <DQTwoColComponent>
                  <StyledDQListContainer >
                    <RadioItem
                      name = {`${name}.type`}
                      title = "на этап"
                      value = "level" 
                      />
                    <RadioItem
                      name = {`${name}.type`}
                      title = "на дисциплину"
                      value = "discipline" 
                      />
                    <Checkbox
                      name = {`${name}.reiting`}
                      title = "оставлять в рейтигне ?"
                      value = "reiting"
                    />
                  </StyledDQListContainer>
                  <FieldArrayRemoveFeature 
                    displayContent = { index > 0 }
                    callback = { (e) => {
                      e.preventDefault();
                      props.fields.remove(index)
                    } }
                  />

                </DQTwoColComponent>
              </StyledDQListContainer>
            ))
          )
        }
      }
    </FieldArray>
  )
}