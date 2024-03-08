import React, { useState, useEffect } from "react";
import img1 from "../images/players/1.jpg";
import img2 from "../images/players/2.jpg";
import img3 from "../images/players/3.jpg";
import img4 from "../images/players/4.jpg";
import img5 from "../images/players/5.jpg";
import img6 from "../images/players/6.jpg";

function Landing() {
  const [stand, setStand] = useState(0);

  useEffect(() => {
    const balls = document.querySelectorAll(".ball");
    balls.forEach((b) => {
      b.classList.remove("active");
    });
    balls[stand].classList.add("active");
  }, [stand]);

  const handleBallClick = (i) => {
    setStand(i);
  };

  const list = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const interval = setInterval(() => {
      setStand((prevStand) => (prevStand + 1) % list.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [list]);

  return (
    <div className="mt-5 gap-4 flex flex-col justify-center items-center">
      <img className="rounded-sm" src={list[stand]} alt="" />
      <div className="balls flex gap-2">
        {list.map((_, i) => (
          <div
            key={i}
            onClick={() => handleBallClick(i)}
            className={`ball w-3 h-3 rounded-full opacity-20 bg-mainBlack ${
              i === stand ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
