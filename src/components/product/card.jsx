import React from "react";
import image1 from "../images/products/fan-shirt/31b5yX8crEL._SL500_-removebg-preview.png";
import image2 from "../images/products/other/1-removebg-preview (1).png";
function Card({ data }) {
  console.log(data.image);
  return (
    <div>
      <img
        src="/static/media/310259119_5367397970035257_3939407306125335686_n-removebg-preview.png"
        alt=""
      />
      <p>{data.title}</p>
    </div>
  );
}

export default Card;
