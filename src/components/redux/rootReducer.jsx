import { combineReducers } from "redux";
import SetReducer from "./setting/SetReducer";

export let rootReducer = combineReducers({
  setting: SetReducer,
});
