import { FC } from "react"
import { ICategoriesItem, ICategoriesItems, IDiscipline } from "../../../types"
import { StyledGridAreaItem } from "../../../shared/components/groupComponents"


const CategoriesItems: FC<{categories: ICategoriesItems | undefined, category: string | undefined}> = ( { categories, category } ) => (
  <>
    {
      categories && category && categories.map( ( cat: ICategoriesItem, i: number, arr: ICategoriesItems ) => {
        
        const state = arr.length - 1 === i
        
        return (
          <span
            key = { `men-${cat.from}-${cat.to}`}
          >
            { cat.from } - { cat.to} 
            { !state  ? "; ": `.`}
          </span>
        )
      })
    }
  </>
)

export const DisciplineCategoriesItems:FC<{discipline: IDiscipline}> = ( {discipline}) => (
  <>
    <StyledGridAreaItem $gridArea = "rule-men">
      <div>мужской пол:</div> 
      <CategoriesItems
        category = { discipline?.categories }
        categories = { discipline?.menCategories }
      />
    </StyledGridAreaItem>

    <StyledGridAreaItem $gridArea = "rule-women">
      <div>женский пол:</div>
      <CategoriesItems 
        category = { discipline?.categories }
        categories = { discipline?.womenCategories }
      />
    </StyledGridAreaItem>
  </>
)