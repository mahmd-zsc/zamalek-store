import request from "../../utils/request";
import { categoryActions } from "../slices/categorySlice";

export let fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.setLoading(true));
      dispatch(categoryActions.setError(null));
      let { data } = await request.get("categories");
      dispatch(categoryActions.setCategories(data));
      dispatch(categoryActions.setLoading(false));
    } catch (error) {
      dispatch(categoryActions.setError(error.response.data));
      dispatch(categoryActions.setLoading(false));
    }
  };
};
export let getCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.setLoading(true));
      dispatch(categoryActions.setError(null));
      let { data } = await request.get(`categories/${categoryId}`);
      dispatch(categoryActions.setCategory(data));
      dispatch(categoryActions.setLoading(false));
    } catch (error) {
      dispatch(categoryActions.setError(error.response.data));
      dispatch(categoryActions.setLoading(false));
    }
  };
};
export let deleteCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.setLoading(true));
      dispatch(categoryActions.setError(null));
      await request.delete(`categories/${categoryId}`);
    } catch (error) {
      dispatch(categoryActions.setError(error.response.data));
      dispatch(categoryActions.setLoading(false));
    }
  };
};
export let updateCategory = (categoryId, formData) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.setLoading(true));
      dispatch(categoryActions.setError(null));
      await request.put(`categories/${categoryId}`, formData);
      dispatch(categoryActions.setLoading(false));
    } catch (error) {
      dispatch(categoryActions.setError(error.response.data));
      dispatch(categoryActions.setLoading(false));
    }
  };
};
export let createCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.setLoading(true));
      dispatch(categoryActions.setError(null));
      await request.post(`categories/`, data);
    } catch (error) {
      // dispatch(categoryActions.setError(error.response.data));
      console.log(error);
      dispatch(categoryActions.setLoading(false));
    }
  };
};
export const updateCategoryImage = (categoryId, file) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.setLoading(true));
      dispatch(categoryActions.setError(null));
      const { data } = await request.put(
        `categories/update-image/${categoryId}`,
        file
      );
    } catch (error) {
      dispatch(categoryActions.setError(error.response?.data));
      console.error(error);
    } finally {
      dispatch(categoryActions.setLoading(false));
    }
  };
};
