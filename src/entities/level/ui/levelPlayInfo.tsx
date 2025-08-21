import { FC } from "react";
import { ILevelList, ILevelListItem } from "../../../types";
import { StyledGridAreaItem } from "../../../shared/components/groupComponents";
import styled from "styled-components";

const translate: {[key:string]: string } = {
  "boy": "мужской пол",
  "girl": "женский пол"
}

interface IProp {
  gender?: string,
  category: string,
  tryAtLevel?: number,
}

const DisciplinePlayLevelInfo = styled.div`
  display: grid;
  grid-template-areas: "gender category";
  grid-template-areas: "category gender" "try try";
  grid-template-columns: .5fr .5fr;
  justify-items: center;
  padding: 0;
  margin: 0 auto 10px;
  max-width: 350px;
  /* border: 1px dotted black; */

  & > div{
    font-style: italic;
  }

`



export const LevelPlayInfo: FC<IProp> = ({gender, category, tryAtLevel }) => (
  <DisciplinePlayLevelInfo>
    <StyledGridAreaItem $gridArea="gender">
      пол: { translate[ gender! ] }
    </StyledGridAreaItem>
    <StyledGridAreaItem $gridArea="category">
      категория: { category }
    </StyledGridAreaItem>
    {
      tryAtLevel && (
        <StyledGridAreaItem $gridArea="try">
          попытка: { tryAtLevel }
        </StyledGridAreaItem>
      )
    }
  </DisciplinePlayLevelInfo>
)