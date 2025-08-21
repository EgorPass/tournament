import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../shared/store/redux/hooks";
import { setSearchFilter } from "../../../shared/store/redux/slices/searchFilterSlice";

export const useSetSearchFilter = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators( { setSearchFilter }, dispatch )
}