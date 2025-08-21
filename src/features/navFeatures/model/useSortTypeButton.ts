import { useGetSortListStore, useSetSortList } from "../../../shared/store/redux/slices/sortSlice"

export const useSortTypeButton = () => {
  const setType = useSetSortList()
  const sortListStore = useGetSortListStore()
  return { setType, sortListStore }
}