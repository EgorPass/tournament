import { FC } from "react";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { FieldArrayRemoveFeature } from "../../../../features/formFeatures";
import { GridItem } from "./gridItem";
import { InputNumber } from "../../../../shared/components/inputFields/inputNumber";

type TFieldType = { from: string, to: string}

export const CategoryWrapper = styled(GridItem)`
  grid-template-columns: repeat(2, 76px) 30px;
  grid-column-gap: 15px;
`
export const CategoryItem = styled(GridItem)`
  grid-template-columns: 19px 42px;
  grid-column-gap: 12px;
`

export const CategoriesItemsComponent: FC<{name: string}> = ( { name } ) => {

  return (
    <FieldArray name = { name }>
      {
        (props) =>{ 
          console.log(props )
          // props.fields.value
          // .sort((x: TFieldType,y: TFieldType) => {
          //   if( ( Number( x.to ) - Number( y.to ) ) > 0 ){
          //     return 1
          //   } 
          //   else return -1
          // }) 

          return (
          props.fields.map((name, index) => (
            <CategoryWrapper
              key = { name + "_" + index }
            >
              <CategoryItem>
                <span>от</span>
                <InputNumber
                  name = {`${name}.from`}
                  placeholder="10"
                />
              </CategoryItem>
              
              <CategoryItem>
                <span>до</span>
                <InputNumber 
                  name = { `${name}.to`}
                  placeholder="10"
                />
              </CategoryItem>

              <FieldArrayRemoveFeature 
                displayContent = { index > 0 }
                callback = { (e) => {
                  e.preventDefault();
                  props.fields.remove(index)
                }  }
              />
            </CategoryWrapper>
          ) )
        )}
      }
    </FieldArray>
  )
}