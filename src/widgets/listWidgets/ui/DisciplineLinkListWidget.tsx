import { FC } from "react";
import { IDiscipline } from "../../../types";
import { LinksBlock } from "../../../shared/components/groupComponents";
import { DisciplineLinkBox } from "../components/DisciplineLinkBox";

export const DisciplineLinkListWidget: FC<{head?: string, disciplines: IDiscipline[] }> = ({head, disciplines })=> (
  <LinksBlock head = {` ${ head ? head : "Дисциплины" }  `}>
    {
      disciplines.map( ( it ) =>  (
        <DisciplineLinkBox
          key = { it.id }
          discipline = { it }
        />
      ))
    }
  </LinksBlock>
)