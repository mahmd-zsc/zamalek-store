import * as typeAction from "./typeAction";

let initialState = {
  mode: true,
  shopping: false,
};

let SetReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeAction.CHANGE_MODE:
      return {
        ...state,
        mode: !state.mode,
      };
    case typeAction.CHANGE_OPEN_SHOPPING:
      return {
        ...state,
        shopping: !state.shopping,
      };
    default:
      return state;
  }
};
export default SetReducer;
