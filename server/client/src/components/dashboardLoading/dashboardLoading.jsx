import React from "react";

function DashboardLoading() {
  return (
    <div className=" flex flex-col mt-4">
      <div className="card__skeleton h-14 rounded-lg"></div>
      <div className=" flex flex-col  mt-1">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            className={`card__skeleton h-12`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default DashboardLoading;
