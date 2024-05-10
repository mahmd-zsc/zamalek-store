import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice ";

export let getUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading(true));
      let { data } = await request.get(`users/${userId}`, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(profileActions.setProfile(data));
      dispatch(profileActions.setLoading(false));
      dispatch(profileActions.setError(null));
    } catch (error) {
      console.log(error);
      dispatch(profileActions.setLoading(false));
    }
  };
};
export let getAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading(true));
      let { data } = await request.get(`users`, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(profileActions.setProfiles(data));
      dispatch(profileActions.setLoading(false));
      dispatch(profileActions.setError(null));
    } catch (error) {
      dispatch(profileActions.setError(error));
      dispatch(profileActions.setLoading(false));
    }
  };
};
export let deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading(true));
      await request.delete(`users/${userId}`, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(profileActions.setLoading(false));
      dispatch(profileActions.setError(null));
    } catch (error) {
      dispatch(profileActions.setError(error));
      dispatch(profileActions.setLoading(false));
    }
  };
};
export let updateUser = (updatedData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading(true));
      let { data } = await request.put(
        `users/${getState().auth.user.id}`,
        updatedData,
        {
          headers: {
            token: getState().auth.user.token,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfile(data));
      dispatch(authActions.setUsername(data.username));
      let user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.getItem("userInfo", JSON.stringify(user));
      dispatch(profileActions.setLoading(false));
    } catch (error) {
      dispatch(profileActions.setLoading(false));
      console.log(error);
      dispatch(profileActions.setError(error.response.data));
    }
  };
};
