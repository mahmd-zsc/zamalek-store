// DashboardHome.js
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../redux/slices/dashboardSlice";

function DashboardHome() {
  let dispatch = useDispatch();
  let { fullSidebar } = useSelector((state) => state.dashboard);
  return (
    <div className="mx-auto">
      <div className="flex items-center gap-4 text-gray-900">
        <FontAwesomeIcon
          onClick={() =>
            dispatch(dashboardActions.setFullSidebar(!fullSidebar))
          }
          size="2xl"
          icon={faBars}
          className=" cursor-pointer"
        />
        <h2 className="font-bold text-2xl capitalize">dashboard</h2>
      </div>
      {/* Placeholder content: Replace with actual dashboard components */}
    </div>
  );
}

export default DashboardHome;
