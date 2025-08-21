import { FC } from "react";
import { IDiscipline } from "../../../types";
import { StyledGridAreaItem } from "../../../shared/components/groupComponents";
import { dqsType } from "../config/dqsType";


export const DisciplineDqs: FC<{discipline: IDiscipline}> = ( { discipline } ) => (
  <StyledGridAreaItem $gridArea="rule-dqs">
    <>
    <h4>Штрафы:</h4>
    
    {
      discipline.dqs.map( (it) => (
        <div key = { `${it.name}-${it.description}` }>
          * <span>{ it.name } - </span>
          <span>{ it.description }: </span>
          <span>{ it.qual} на </span>
          <span>{ dqsType[ it.type ] }, </span>
          <span>
            { it.reiting.length > 0 ? dqsType.reiting : "с потерей рйтинга"}
          </span>
        </div>
      ))
    }
    </>
  </StyledGridAreaItem>
)