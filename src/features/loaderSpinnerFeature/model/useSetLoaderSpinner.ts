import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../shared/store/redux/hooks";
import { setLoaderSpinner } from "../../../shared/store/redux/slices/loaderSlice";

export const useSetLoaderSpinner = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators( { setLoaderSpinner }, dispatch )
}
