// Dashboard.js
import React from "react";
import Sidebar from "../../components/slider/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div
      // style={{ height: "calc(100vh - 72px - 168px)" }}
      className="dashboard-container mt-20 flex min-h-screen container  overflow-hidden bg-gray-50"
    >
      <Sidebar />
      <div
       // Adjusted the scrollbar width here
        className="main-content m-4 p-0 w-full bg-white "
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
