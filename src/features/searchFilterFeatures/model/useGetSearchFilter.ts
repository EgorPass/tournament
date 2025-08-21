import { useAppSelector } from "../../../shared/store/redux/hooks"

export const useGetSearchFilter = () => {
	return useAppSelector( state => state.searchFilter )
}