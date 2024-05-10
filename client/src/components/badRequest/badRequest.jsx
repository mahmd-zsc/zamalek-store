import React from "react";

function BadRequest() {
  return (
    <div className=" absolute left-0 top-0 w-full  mt-80 flex justify-center flex-col items-center">
      <div>
        <h4 className=" superFont text-2xl md:text-5xl">400 bad request</h4>
        <div className=" w-full h-px bg-black mt-1"></div>
      </div>
    </div>
  );
}

export default BadRequest;
