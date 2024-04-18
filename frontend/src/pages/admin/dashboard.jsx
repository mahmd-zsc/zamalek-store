// Dashboard.js
import React from "react";
import Sidebar from "../../components/slider/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div
      style={{ height: "calc(100vh - 72px - 168px)" }}
      className="dashboard-container mt-20 flex container bg-gray-100 overflow-hidden"
    >
      <Sidebar />
      <div
       // Adjusted the scrollbar width here
        className="main-content m-4 p-0 w-full bg-white overflow-y-scroll custom-scrollbar"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
