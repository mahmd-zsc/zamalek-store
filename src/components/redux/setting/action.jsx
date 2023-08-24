import * as typeAction from "./typeAction";

export let changeMode = () => {
  return {
    type: typeAction.CHANGE_MODE,
  };
};
export let changeOpenShopping = () => {
  return {
    type: typeAction.CHANGE_OPEN_SHOPPING,
  };
};
