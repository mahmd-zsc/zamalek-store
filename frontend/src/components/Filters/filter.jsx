import React from "react";

function Filter() {
  return (
    <div>
      <select className="border border-mainBlack w-40" name="color" id="">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </div>
  );
}

export default Filter;
