// Dashboard.js
import React from "react";
import Sidebar from "../../components/slider/sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div
      // style={{ height: "calc(100vh - 72px - 168px)" }}
      className="    flex min-h-screen   overflow-hidden  "
    >
      <Sidebar />
      <div
        // Adjusted the scrollbar width here
        className="main-content h-screen overflow-hidden overflow-y-scroll pt-10 px-6   w-full bg-[#f1f1f1] "
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
