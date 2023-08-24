import React from "react";
import api from "../../api.json";
import axios from "axios";
import Card from "./card";
function Product() {
  return (
    <div className=" grid lg:grid-cols-4 h-[300px] gap-2 mt-10  ">
      {api.slice(0, 8).map((b) => (
        <Card data={b} />
      ))}
    </div>
  );
}

export default Product;
