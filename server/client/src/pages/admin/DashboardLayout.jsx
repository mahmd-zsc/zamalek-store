// DashboardLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
