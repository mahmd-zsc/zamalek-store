import React from "react";
import Logo from "./logo";
import Search from "./search";
import Shopping_mode from "./shoping-mode";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  let state = useSelector((state) => state.setting);
  return (
    <div className=" relative w-full h-20 flex justify-center   ">
      <div className="header h-20 flex items-center justify-between py-2 fixed top-0 container  w-full  bg-white dark:bg-mainBlack shadow   ">
        <Logo />
        <Search />
        <Shopping_mode />
      </div>
    </div>
  );
}

export default Header;
