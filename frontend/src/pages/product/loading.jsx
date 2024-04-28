import React from "react";

function Loading() {
  return (
    <div className=" container min-h-screen md:pt-40 pt-20 pb-20  ">
      <div className=" flex gap-4 flex-col lg:flex-row w-full overflow-hidden   lg:h-[500px]">
        <div className="loadingCard    h-[500px]  lg:h-auto   md:px-20 lg:px-0 lg:w-1/2 card__skeleton rounded-md  "></div>
        <div className=" flex-1   ">
          <div className=" card__skeleton h-10 w-1/2 rounded-md"></div>
          <div className=" card__skeleton h-6 w-[80%] mt-5 rounded-md"></div>
          <div className=" card__skeleton h-6 w-12 mt-10 rounded-md"></div>
          <div className=" flex gap-2 h-6  mt-4 w-full">
            {Array.from({ length: 9 }).map((_, index) => (
              <div className="card__skeleton h-10 w-10  " key={index}>
                {/* Your JSX content */}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-10">
            <div className=" flex-1 h-16  card__skeleton rounded-md "></div>
            <div className=" flex-1 h-16  card__skeleton rounded-md"></div>
          </div>
          <div className=" h-60 card__skeleton mt-4 "></div>
        </div>
      </div>
      <div className=" h-10 w-80 card__skeleton mt-10 rounded-md  "></div>
      <div className=" grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="card__skeleton h-[700px] sm:h-[500px] lg:h-96  flex-1 rounded-md  "
            key={index}
          >
            {/* Your JSX content */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;
