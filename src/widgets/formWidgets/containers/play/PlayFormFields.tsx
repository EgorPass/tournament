import { FC, useEffect } from "react"
import { PlayerDQRow } from "../../components/play/formRows/PlayerDQRow"
import { PlayerErrorRow } from "../../components/play/formRows/PlayerErrorRow"
import { DQTypes } from "../../../../types"
import { FieldArrayPusherFeature } from "../../../../features/formFeatures"
import { useForm } from "react-final-form"
import { useGetErrorPusherState } from "../../model/play/useGetErrorPusherState"
import { PlayerFormWrapper, PusherRowWrapper, ResultRowWrapper } from "../../components/play/Wrappers"
import { ResultDataField } from "../../components/play/resultDataField/ResultDataField"
import { TimeResultInfo } from "./TimeResultInfo"

interface IProp {
  id: string,
  condition: string,
  dqList: DQTypes[],
  idx?: string,
  resultName?: string,
  dqName?:string
}


export const PlayerFormFields:FC<IProp> = ( {id, condition,  dqList, idx }) => {
  // console.log( 'render form fields for player...')

  const form = useForm()
  const state = useGetErrorPusherState( condition, id, idx )

  let errorMutator: {[k:string]: string } = {}
  if(condition === "time" ) errorMutator = { min: "", sec:"", ms: "" } 
  else errorMutator = { point: "" }

  useEffect(()=> {
    if( !state ) {
      form.change( `results.${ !!idx ? idx + "." + id : id  }.errors`, [] )
    }
  }  , [ state ] )

  const dqName = `dq.${ !!idx ? idx + "." + id : id }`
  const resultName = `results.${ !!idx ? idx + "." + id : id }`

  return( 
    <PlayerFormWrapper>

      <ResultRowWrapper>
        <h6>Результат</h6>
        <div>
          <ResultDataField 
            condition = { condition } 
            name = { `${ resultName }.results` } 
          />
        </div>
      </ResultRowWrapper>
    
      <ResultRowWrapper>
        <h6>Итого:</h6>
        <div>
          { condition === "time" && <TimeResultInfo id = { id } idx = { idx } /> }
          { condition === "point" && <></> }
        </div>
      </ResultRowWrapper>

      <PusherRowWrapper >
         <FieldArrayPusherFeature
          name = { dqName } 
          pushTitle = "Добавить штраф"
          mutatorField = { { name: "", desc: "", tournament_player_id: id } }
        />
        { state &&
            <FieldArrayPusherFeature
              name = { `${ resultName }.errors` } 
              pushTitle = "Добавить ошибку"
              mutatorField = { {...errorMutator, desc: ""} }
            />
        }
      </PusherRowWrapper>

      <PlayerErrorRow
        condition = { condition } 
        name = { `${ resultName }.errors` }
      />

      <PlayerDQRow 
        dqList = { dqList }
        name = { dqName }
      />

    </PlayerFormWrapper>
  )
}