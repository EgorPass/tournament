import { useAppSelector } from "../../../shared/store/redux/hooks"

export const useGetLoaderSpinner = () => {
  return useAppSelector( state => state.loaderSpinner )
}
