import { FC } from "react";
import { PointResultRecordForm } from "./PointResultRecordForm";
import { TimeResultRecordForm } from "./TimeResultRecordForm";


// add stoper to change length field at min & sec to inter errors data 
export const ResultDataField:FC<{name: string, condition: string, stopper?: boolean }> = ({ name, condition, stopper = true}) => (
  <>
    { condition === "time" &&  <TimeResultRecordForm name = { name } stopper = { stopper }/> }
    { condition === "point" && <PointResultRecordForm name = { name  } /> }
  </>
)