import { FC } from "react"
import styled from "styled-components"
import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures"
import { IPLayLayoutContext } from "../../../../types"
import { PlayerFormFields } from "./PlayFormFields"
import { Condition } from "../../../../shared/components/inputFields/condition"
import { ConditionForEmpty } from "../../../../shared/components/inputFields/conditionForEmpty"

const DNSWrapper = styled.div`
  padding: 0;
  margin: 0 0 0 60px;

`
export const PlayerFormContainer: FC<{ id: string }> = ({ id }) => {
  // console.log( '6 - player form containers ....')
  const {  discipline  } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  const condition = discipline!.condition

  return (
    <>
      <Condition when = "onStart" is = { [ id ] }>
        <PlayerFormFields 
          id = { id }
          condition = { condition }
          dqList = { discipline!.dqs }
          />
      </Condition>
      <ConditionForEmpty when = "onStart" is = { [id] }>
        <DNSWrapper>НЕ ЯВИЛСЯ!!!</DNSWrapper>
      </ConditionForEmpty>
    </>
  )
}