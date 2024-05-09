import request from "../../utils/request";
import { brandActions } from "../slices/brandSlice";

export let fetchBrands = () => {
  return async (dispatch) => {
    try {
      dispatch(brandActions.setLoading(true));
      dispatch(brandActions.setError(null));
      let { data } = await request.get("brands");
      dispatch(brandActions.setBrands(data));
      dispatch(brandActions.setLoading(false));
    } catch (error) {
      dispatch(brandActions.setError(error.response.data));
      dispatch(brandActions.setLoading(false));
    }
  };
};
export let deleteBrand = (brandId) => {
  return async (dispatch) => {
    try {
      dispatch(brandActions.setLoading(true));
      dispatch(brandActions.setError(null));
      await request.delete(`brands/${brandId}`);
      dispatch(brandActions.setLoading(false));
    } catch (error) {
      dispatch(brandActions.setError(error.response.data));
      dispatch(brandActions.setLoading(false));
    }
  };
};
export let createBrand = (data) => {
  return async (dispatch) => {
    try {
      dispatch(brandActions.setLoading(true));
      dispatch(brandActions.setError(null));
      await request.post(`brands/`, data);
    } catch (error) {
      dispatch(brandActions.setError(error.response.data));
      dispatch(brandActions.setLoading(false));
    }
  };
};
export const updateBrand = (brandId, formData) => {
  return async (dispatch) => {
    try {
      dispatch(brandActions.setLoading(true));
      dispatch(brandActions.setError(null));
      const { data } = await request.put(`brands/${brandId}`, formData);
      console.log(data);
    } catch (error) {
      dispatch(brandActions.setError(error.response?.data));
      console.error(error);
    } finally {
      dispatch(brandActions.setLoading(false));
    }
  };
};
export const updateBrandImage = (brandId, file) => {
  return async (dispatch) => {
    try {
      dispatch(brandActions.setLoading(true));
      dispatch(brandActions.setError(null));

      // Assuming request.put returns a promise
      const response = await request.put(
        `brands/update-image/${brandId}`,
        file
      );

      // dispatch(brandActions.updateBrandImageSuccess(response.data));
    } catch (error) {
      // Handle errors
      dispatch(brandActions.setError(error.response?.data));
      console.error(error);
    } finally {
      dispatch(brandActions.setLoading(false));
    }
  };
};

export let getBrand = (brandId) => {
  return async (dispatch) => {
    try {
      dispatch(brandActions.setLoading(true));
      dispatch(brandActions.setError(null));
      let { data } = await request.get(`brands/${brandId}`);
      dispatch(brandActions.setBrand(data));
      dispatch(brandActions.setLoading(false)); 
    } catch (error) {
      dispatch(brandActions.setError(error.response.data));
      dispatch(brandActions.setLoading(false));
    }
  };
};
