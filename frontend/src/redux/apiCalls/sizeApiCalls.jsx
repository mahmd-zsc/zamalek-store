import request from "../../utils/request";
import { sizeActions } from "../slices/sizeSlice";

export let fetchSizes = () => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      let { data } = await request.get("sizes");
      dispatch(sizeActions.getSize(data));
      dispatch(sizeActions.setLoading(false));
    } catch (error) {
      dispatch(sizeActions.setError(error.response.data));
      dispatch(sizeActions.setLoading(false));
    }
  };
};
export let createSize = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      let { data } = await request.post("sizes", formData);
      dispatch(sizeActions.setLoading(false));
    } catch (error) {
      dispatch(sizeActions.setError(error.response.data));
      dispatch(sizeActions.setLoading(false));
    }
  };
};
