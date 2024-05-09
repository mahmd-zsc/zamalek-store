import request from "../../utils/request";
import { sizeActions } from "../slices/sizeSlice";

export let fetchSizes = () => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      let { data } = await request.get("sizes");
      dispatch(sizeActions.setSizes(data));
      dispatch(sizeActions.setLoading(false));
    } catch (error) {
      dispatch(sizeActions.setError(error.response));
      dispatch(sizeActions.setLoading(false));
    }
  };
};
export let createSize = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      await request.post("sizes", formData);
      dispatch(sizeActions.setLoading(false));
    } catch (error) {
      dispatch(sizeActions.setError(error.response));
      dispatch(sizeActions.setLoading(false));
    }
  };
};

export let updateSize = (sizeId, formData) => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      await request.put(`sizes/${sizeId}`, formData);
      dispatch(sizeActions.setLoading(false));
    } catch (error) {
      dispatch(sizeActions.setError(error.response));
      dispatch(sizeActions.setLoading(false));
    }
  };
};
export let getSize = (sizeId) => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      let { data } = await request.get(`sizes/${sizeId}`);
      dispatch(sizeActions.setSize(data));
      dispatch(sizeActions.setLoading(false));
    } catch (error) {
      dispatch(sizeActions.setError(error.response.data));
      dispatch(sizeActions.setLoading(false));
    }
  };
};

export let deleteSize = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(sizeActions.setLoading(true));
      dispatch(sizeActions.setError(null));
      await request.delete(`sizes/${categoryId}`);
    } catch (error) {
      dispatch(sizeActions.setError(error.response.data));
      dispatch(sizeActions.setLoading(false));
    }
  };
};
