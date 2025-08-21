import { FC } from "react";
import { IDiscipline } from "../../../types";
import { LinkBox } from "../../../shared/components/buttonsAndLinks";

export const DisciplineLinkBox: FC<{discipline: IDiscipline }> = ( { discipline } ) => (
  <LinkBox
    to = "/api/view/discipline/check"
    state = {{ from: { pathname: "discipline", id:  discipline.id } }}
  >
    { discipline.name }
  </LinkBox>
)