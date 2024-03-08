import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import Filter from "./components/Filters/filter";
import Header from "./components/header/header";
import Landing from "./components/landing/landing";
import Product from "./components/product/product";
import ShoppingCart from "./components/shopping-cart/shopping-cart";
import { store } from "./components/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  let mode = useSelector((state) => state.setting.mode);
  return (
    <>
      <div
        className={`w-full h-full bg-gray-50 dark:bg-gray-900 ${
          !mode && "dark"
        }`}
      >
        <div className="w-full h-full dark:bg-[#121212]">
          <div className={`App relative container h-[3000px] `}>
            <Header />
            <ShoppingCart />
            <Landing />
            <Product />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
