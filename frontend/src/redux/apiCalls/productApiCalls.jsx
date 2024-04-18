import request from "../../utils/request";
import { productActions } from "../slices/productSlice";

export let fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setLoading(true));
      dispatch(productActions.setError(null));
      let { data } = await request.get("products");
      dispatch(productActions.getProduct(data));
      dispatch(productActions.setLoading(false));
    } catch (error) {
      dispatch(productActions.setError(error.response.data));
      dispatch(productActions.setLoading(false));
    }
  };
};
export let deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.setError(null));
      let { data } = await request.delete(`products/${productId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
