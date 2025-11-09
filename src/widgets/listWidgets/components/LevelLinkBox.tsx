import { FC } from "react";
import { LinkBox } from "../../../shared/components/buttonsAndLinks";
import { ILevel } from "../../../types";

export const LevelLinkBox: FC<ILevel> = ({id, name}) =>  (
  <LinkBox
    to = "/api/view/level"
    state = {{ 
      from: { pathname: "level", id, },
    }}
  >
    { name }
  </LinkBox>
)