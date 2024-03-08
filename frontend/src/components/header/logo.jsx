import React from "react";
import whiteLogo from "../images/white-logo.png";
import darkLogo from "../images/dark-logo.png";
import { useSelector } from "react-redux";
function Logo() {
  let mode = useSelector((state) => state.setting.mode);
  return (
    <div className="logo flex justify-center items-center gap-2 overflow-hidden h-full select-none  ">
      <img src={mode ? whiteLogo : whiteLogo} alt="logo" className="w-8" />
      <div className="line w-[1px] bg-mainBlack dark:bg-white h-[80%]"></div>
      <div>
        <p className="font-bold text-mainBlack dark:text-white capitalize text-sm">
          official
        </p>
        <p className="font-bold text-mainBlack dark:text-white capitalize text-sm">
          online store
        </p>
      </div>
    </div>
  );
}

export default Logo;
