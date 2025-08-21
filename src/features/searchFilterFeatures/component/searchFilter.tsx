import { FC, useEffect } from "react"
import { useGetSearchFilter } from "../model/useGetSearchFilter";
import { useSetSearchFilter } from "../model/useSetSearchFilter";
import { GroupContentWrapper } from "../../../shared/components/groupComponents";
import { SearchField } from "../../../shared/components/inputFields/searchField";



export const SearchFilter: FC<{ placeholder: string }> = ({ placeholder }) => {
  const searchFilter = useGetSearchFilter()
  const { setSearchFilter } = useSetSearchFilter()  
  
  useEffect(()=> {
    return () => { 
      setSearchFilter("") 
    }
  }
    ,[]
  )

  return(
    <GroupContentWrapper>
      <SearchField
        placeholder = { placeholder }
        value = { searchFilter }
        onchange = { (e) => {
          e.preventDefault()
          const { target: {value} } = e
          setSearchFilter( value )
        }}
      />
    </GroupContentWrapper>
  ) 
}