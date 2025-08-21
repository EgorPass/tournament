import { FC } from "react";
import { FieldArray } from "react-final-form-arrays";
import { ErrorWrapper, FieldArrayWrapper, ResultRowWrapper } from "../Wrappers";
import { FieldArrayRemoveFeature } from "../../../../../features/formFeatures/ui/FieldArrayRemoveFeature";
import styled from "styled-components";
import { StyledGridAreaItem } from "../../../../../shared/components/groupComponents";
import { InputText } from "../../../../../shared/components/inputFields/inputText";
import { ResultDataField } from "../resultDataField/ResultDataField";

export const ErrorContentBox = styled.div`

  display: grid;
  grid-template-areas: "errors" "description";
  /* grid-template-rows: auto; */
  grid-auto-rows: 35px;
  
  /* border: 1px dotted red; */
  
  margin: 10px 0 0 0 ;

  @media (${props => props.theme.media.max}) {
    padding-left: 0;
    grid-template-areas: "errors" "description";
    grid-template-columns:  auto;

  }
`

export const PlayerErrorRow: FC<{ name:string, condition:string}> = ({ name, condition }) => (
  <FieldArrayWrapper>
    <FieldArray name = { name }>
      {
        (props ) => {
          return props.fields.map( (name, index)  => (
            <ErrorWrapper key = { name + "_" + index }>
              <ResultRowWrapper>
                <h6>ошибка</h6>
                <ErrorContentBox>
                  <StyledGridAreaItem $gridArea="errors">
                    <ResultDataField
                      name = { name } 
                      stopper = { false }
                      condition = { condition } 
                    />
                  </StyledGridAreaItem>
                  <StyledGridAreaItem $gridArea="description">
                    <InputText
                      name = { `${ name }.desc` }
                      placeholder = "описание"
                      valid = { false }
                    />
                  </StyledGridAreaItem>

                </ErrorContentBox>
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
        }
      }
    </FieldArray>
  </FieldArrayWrapper>
)
