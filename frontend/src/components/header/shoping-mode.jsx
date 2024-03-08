import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import dark from "../images/mode/night-mode.png";
import light from "../images/mode/sun.png";
import shoppingBlack from "../images/bag-black.png";
import shoppingWhite from "../images/bag-white.png";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, changeOpenShopping } from "../redux/setting/action";
function Shopping_mode() {
  let setting = useSelector((state) => state.setting);
  let dispatch = useDispatch();
  let handleMode = () => {
    dispatch(changeMode());
  };
  let handleShopping = () => {
    dispatch(changeOpenShopping());
  };
  return (
    <div className="flex items-center gap-4">
      <img
        onClick={handleMode}
        className="w-6 cursor-pointer"
        src={setting.mode ? dark : light}
        alt="moon"
      />
      <img
        onClick={handleShopping}
        className="w-6 cursor-pointer"
        src={setting.mode ? shoppingBlack : shoppingWhite}
        alt=""
      />
    </div>
  );
}

export default Shopping_mode;
