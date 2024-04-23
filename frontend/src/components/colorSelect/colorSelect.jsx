import React, { useState } from "react";
import "./colorSelect.css";

function ColorSelect({ handleChange, activeColor, setActiveColor }) {
  const popularColors = [
    { name: "Red", colorCode: "#FF0000" },
    { name: "Blue", colorCode: "#0000FF" },
    { name: "Green", colorCode: "#00FF00" },
    { name: "Yellow", colorCode: "#FFFF00" },
    { name: "Orange", colorCode: "#FFA500" },
    { name: "Purple", colorCode: "#800080" },
    { name: "Pink", colorCode: "#FFC0CB" },
    { name: "Black", colorCode: "#000000" },
    { name: "White", colorCode: "#FFFFFF" },
    { name: "Gray", colorCode: "#808080" },
  ];


  const handleClick = (colorCode, name) => {
    setActiveColor(name);
    handleChange({ target: { name: "color", value: name } });
  };

  return (
    <div className="flex flex-col gap-2 md:items-start">
      <label className="mb text-gray-400" htmlFor="category">
        Color
      </label>
      <div className="color-select flex w-full flex-wrap gap-3 items-center">
        {popularColors.map((color) => (
          <div
            key={color.colorCode}
            onClick={() => handleClick(color.colorCode, color.name)}
            className={`w-6 h-6 rounded-full cursor-pointer shadow-md hover:scale-110 duration-150 ${
              activeColor === color.name ? "active" : ""
            }`}
            style={{ backgroundColor: color.colorCode }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ColorSelect;
