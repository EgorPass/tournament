import { FC } from "react";
import { InputNumber } from "../../../../../shared/components/inputFields/inputNumber";


export const PointResultRecordForm: FC<{ name: string }> = ({ name }) =>  (
  <div> 
      <InputNumber
      name = { `${ name }.point` }
      placeholder = "очки"
      valid = { false }
    />
    судим по очкам
  </div>
)
