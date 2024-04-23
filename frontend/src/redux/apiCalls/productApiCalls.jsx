import request from "../../utils/request";
import { productActions } from "../slices/productSlice";

export let fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setLoading(true));
      dispatch(productActions.setError(null));
      let { data } = await request.get("products");
      dispatch(productActions.setProducts(data));
      dispatch(productActions.setLoading(false));
    } catch (error) {
      dispatch(productActions.setError(error.response.data));
      dispatch(productActions.setLoading(false));
    }
  };
};
export let getProduct = (productId) => {
  console.log(productId);
  return async (dispatch) => {
    try {
      dispatch(productActions.setLoading(true));
      dispatch(productActions.setError(null));
      let { data } = await request.get(`products/${productId}`);
      dispatch(productActions.setProduct(data));
      dispatch(productActions.setLoading(false));
    } catch (error) {
      dispatch(productActions.setError(error.response.data));
      dispatch(productActions.setLoading(false));
    }
  };
};
export const createProduct = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setProductCreatedMessage(null));

      dispatch(productActions.setLoading(true));
      dispatch(productActions.setError(null));
      const { data } = await request.post("products", formData);
      console.log(data)
      dispatch(productActions.setProductCreatedMessage(data));

    } catch (error) {
      dispatch(productActions.setError(error.response?.data));
      console.error(error);
    } finally {
      dispatch(productActions.setLoading(false));
    }
  };
};
export const updateProduct = (productId, formData) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setLoading(true));
      dispatch(productActions.setError(null));
      const { data } = await request.put(`products/${productId}`, formData);
      console.log(data);
    } catch (error) {
      dispatch(productActions.setError(error.response?.data));
      console.error(error);
    } finally {
      dispatch(productActions.setLoading(false));
    }
  };
};
export const updateProductImage = (productId, file) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setLoading(true));
      dispatch(productActions.setError(null));
      const { data } = await request.put(
        `products/update-image/${productId}`,
        file
      );
    } catch (error) {
      dispatch(productActions.setError(error.response?.data));
      console.error(error);
    } finally {
      dispatch(productActions.setLoading(false));
    }
  };
};

export let deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setError(null));
      await request.delete(`products/${productId}`);
    } catch (error) {
      dispatch(productActions.setError(error));
    }
  };
};
