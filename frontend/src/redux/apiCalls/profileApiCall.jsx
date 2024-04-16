import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice ";

export let getUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading(true));
      let { data } = await request.get(
        `users/${userId}`
        // , {
        //   headers: {
        //     token: getState().auth.user.token,
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      dispatch(profileActions.setProfile(data));
      dispatch(profileActions.setLoading(false));
    } catch (error) {
      // dispatch(profileActions.makeLoginError(error.response.data));
      console.log(error);
      dispatch(profileActions.setLoading(false));
    }
  };
};
