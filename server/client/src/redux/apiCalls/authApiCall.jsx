import axios from "axios";
// import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";

export let loginUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.clearErrors());
      let { data } = await request.post("auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(authActions.makeLoginError(error.response.data)); // This action should have a defined type
    }
  };
};

export let logoutUser = () => {
  return (dispatch) => {
    dispatch(authActions.logout()); // This action should have a defined type
    dispatch(authActions.clearErrors());
    localStorage.removeItem("userInfo");
  };
};
export let registerUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.clearErrors());
      let { data } = await request.post("auth/register", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(authActions.makeRegisterError(error.response.data)); // This action should have a defined type
    }
  };
};
