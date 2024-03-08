import React from "react";

function Card({ data }) {
  console.log(data);

  return (
    <div>
      <img src={data.image} alt="" />
      <p>{data.title}</p>
    </div>
  );
}

export default Card;
