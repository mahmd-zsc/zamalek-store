import request from "../../utils/request";
import { colorActions } from "../slices/colorSlice";

export const fetchColors = () => {
  return async (dispatch) => {
    try {
      dispatch(colorActions.setLoading(true));
      dispatch(colorActions.setError(null));
      const { data } = await request.get("colors");
      dispatch(colorActions.setColors(data));
      dispatch(colorActions.setLoading(false));
    } catch (error) {
      dispatch(colorActions.setError(error.response?.data));
      dispatch(colorActions.setLoading(false));
    }
  };
};

export const deleteColor = (colorId) => {
  return async (dispatch) => {
    try {
      dispatch(colorActions.setLoading(true));
      dispatch(colorActions.setError(null));
      await request.delete(`colors/${colorId}`);
      dispatch(colorActions.setLoading(false));
    } catch (error) {
      dispatch(colorActions.setError(error.response?.data));
      dispatch(colorActions.setLoading(false));
    }
  };
};

export const createColor = (data) => {
  return async (dispatch) => {
    try {
      dispatch(colorActions.setLoading(true));
      dispatch(colorActions.setError(null));
      await request.post(`colors/`, data);
      // Optionally, dispatch an action to handle success
    } catch (error) {
      dispatch(colorActions.setError(error.response?.data));
      dispatch(colorActions.setLoading(false));
    }
  };
};

export const updateColor = (colorId, formData) => {
  return async (dispatch) => {
    try {
      dispatch(colorActions.setLoading(true));
      dispatch(colorActions.setError(null));
      const { data } = await request.put(`colors/${colorId}`, formData);
      // Optionally, dispatch an action to handle success
    } catch (error) {
      dispatch(colorActions.setError(error.response?.data));
      dispatch(colorActions.setLoading(false));
    }
  };
};
