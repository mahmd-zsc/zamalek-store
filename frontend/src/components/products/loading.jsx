import React from "react";

function Loading() {
  return (
    <div className=" grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10 p-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          style={{ boxShadow: "0 3px 10px #0000001a" }}
          className=" flex flex-col gap-2 h-[700px] sm:h-[500px]  md:h-[450px]  lg:h-[350px] rounded-md p-2 "
        >
          <div className="card__skeleton flex-1 rounded-lg "></div>
          <div className="card__skeleton h-px "></div>
          <div className="card__skeleton h-8 mx-4 rounded-lg "></div>
          <div className="card__skeleton h-6 mx-8 rounded-lg "></div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
