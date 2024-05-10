import request from "../../utils/request";
import { searchActions } from "../slices/searchSlice";

export let fetchSearchProducts = (searchWords) => {
  let search = window.location.search;
  return async (dispatch) => {
    try {
      dispatch(searchActions.setLoading(true));
      dispatch(searchActions.setError(null));
      let { data } = await request.get("products?search=" + searchWords);
      dispatch(searchActions.setProducts(data));
      dispatch(searchActions.setLoading(false));
    } catch (error) {
      dispatch(searchActions.setError(error.response.data));
      dispatch(searchActions.setLoading(false));
      dispatch(searchActions.setProducts([]));
    }
  };
};
export let fetchSearchProductsQuery = () => {
  let search = window.location.search;
  return async (dispatch) => {
    try {
      // dispatch(searchActions.setLoading(true));
      dispatch(searchActions.setError(null));
      let { data } = await request.get("products" + search);
      dispatch(searchActions.setProducts(data));
      dispatch(searchActions.setLoading(false));
    } catch (error) {
      dispatch(searchActions.setError(error.response.data));
      dispatch(searchActions.setLoading(false));
      dispatch(searchActions.setProducts([]));
    }
  };
};
