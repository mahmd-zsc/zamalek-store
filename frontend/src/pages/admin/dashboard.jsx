// Dashboard.js
import React from "react";
import Sidebar from "../../components/slider/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container  mt-20 flex  container bg-gray-100">
      <Sidebar />
      <div className="main-content m-4 p-0   w-full h-screen bg-white ">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
