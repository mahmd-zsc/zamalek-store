import React, { useEffect, useState } from "react";
import "./colorSelect.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from "../../redux/apiCalls/colorApiCalls";

function ColorSelect({ handleChange, activeColor, setActiveColor }) {
  let dispatch = useDispatch();
  let { colors } = useSelector((state) => state.color);

  useEffect(() => {
    dispatch(fetchColors());
  }, {});

  const handleClick = (colorCode, name, id) => {
    setActiveColor(name);
    handleChange({ target: { name: "color", value: id } });
  };

  return (
    <div className="flex flex-col gap-2 md:items-start">
      <label className="mb text-gray-400" htmlFor="category">
        Color
      </label>
      <div className="color-select flex w-full flex-wrap gap-3 items-center">
        {colors.map((color) => (
          <div
            key={color.colorCode}
            onClick={() => handleClick(color.colorCode, color.name, color._id)}
            className={`w-6 h-6 rounded-full cursor-pointer shadow-md hover:scale-110 duration-150 border border-black ${
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
