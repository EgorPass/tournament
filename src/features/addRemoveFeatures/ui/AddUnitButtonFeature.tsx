import {  FC } from "react"
import { IUnit } from "../../../types"
import { CardButton } from "../components/CardButton"
import { CurrentUnitCardInfo } from "../../../entities/unit"
import { useAddUnitButton } from "../model/useButtonsModel/useAddUnitButton"

export const AddUnitButtonFeature:FC<{ unit: IUnit, tournament_id: string, discipline_id: string }> = ({ unit, tournament_id, discipline_id } ) => {
  const mutate = useAddUnitButton()
  return (
    <CardButton
      onClick = { ( e ) => {
        e.preventDefault()
        mutate.mutate( {
          tournament_id, 
          discipline_id, 
          current_unit_id: unit.id,
        })
      }}
    >
      <CurrentUnitCardInfo { ...unit } />
    </CardButton>
  )
}