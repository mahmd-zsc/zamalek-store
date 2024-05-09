// Dashboard.js
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/slider/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dashboardActions } from "../../redux/slices/dashboardSlice";
import CreateProduct from "../../components/actions/product/createProduct";
import EditProduct from "../../components/actions/product/editProduct";
import CreateSize from "../../components/actions/size/createSize";
import EditSize from "../../components/actions/size/editSize";
import CreateCategory from "../../components/actions/category/createCategory";
import EditCategory from "../../components/actions/category/editCategory";
import CreateBrand from "../../components/actions/brand/createBrand";
import EditBrand from "../../components/actions/brand/editBrand";

function Dashboard() {
  let dispatch = useDispatch();
  let { action } = useSelector((state) => state.dashboard);
  let location = useLocation();

  useEffect(() => {
    dispatch(dashboardActions.setAction(""));
  }, [location.pathname]);
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div
        style={{ height: "calc(100vh - 16px)" }}
        className="main-content  overflow-hidden custom-scrollbar overflow-y-scroll pt-8 px-6 w-full bg-[#f1f1f1] my-2 mr-2 rounded-3xl"
      >
        {/* Pass both fullSidebar and setFullSidebar to DashboardHome */}
        <Outlet />
      </div>

      <div
        className={`${
          action ? "w-[500px] opacity-100" : "w-0 op"
        } duration-300 h-screen overflow-hidden overflow-y-scroll custom-scrollbar pt-6  `}
      >
        {action === "create-product" && <CreateProduct />}
        {action === "edit-product" && <EditProduct />}
        {action === "create-size" && <CreateSize />}
        {action === "edit-size" && <EditSize />}
        {action === "create-category" && <CreateCategory />}
        {action === "edit-category" && <EditCategory />}
        {action === "create-brand" && <CreateBrand />}
        {action === "edit-brand" && <EditBrand />}
      </div>
    </div>
  );
}

export default Dashboard;
