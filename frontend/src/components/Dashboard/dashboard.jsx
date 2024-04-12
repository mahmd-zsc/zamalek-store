// Dashboard.js
import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container  mt-20 flex  container">
      <Sidebar />
      <div className="main-content m-4   w-full h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
