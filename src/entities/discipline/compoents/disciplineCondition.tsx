import { FC } from "react"
import { StyledGridAreaItem } from "../../../shared/components/groupComponents"
import { IDiscipline } from "../../../types"
import { categories, condition } from "../config/condition"

export const DisciplineCondition: FC<{ discipline: IDiscipline }> = ( { discipline } ) => (
  <>
    <StyledGridAreaItem $gridArea = "rule-condition">
      Условия победы: &nbsp;{ discipline && condition[ discipline.condition ] }.
    </StyledGridAreaItem>
    <StyledGridAreaItem $gridArea = "rule-categories">
      Разбивка на категории: &nbsp;{ discipline && categories[ discipline.categories ] }.
    </StyledGridAreaItem>
  </>
)