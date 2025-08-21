import { IDiscipline } from "../../../types";
import { GroupContentWrapper } from "../../../shared/components/groupComponents";
import { GroupContentHead } from "../../../shared/components/heads";
import { DisciplineInfoWrapper } from "../compoents/disciplineInfoWrapper";
import { DisciplineCategoriesItems } from "../compoents/disciplineCategoriesItems";
import { DisciplineCondition } from "../compoents/disciplineCondition";
import { DisciplineDqs } from "../compoents/disciplineDqs";
import { FC } from "react";

export const DisciplineInfoBlock: FC<IDiscipline> = (discipline) => (
  <GroupContentWrapper>
    <GroupContentHead>Правила дисциплины</GroupContentHead>
    <DisciplineInfoWrapper >
      <DisciplineCondition discipline = { discipline } />
      <DisciplineDqs discipline = { discipline } /> 
      <DisciplineCategoriesItems discipline ={ discipline } />
    </DisciplineInfoWrapper>

  </GroupContentWrapper>
)