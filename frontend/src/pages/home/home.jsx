// Home.js
import React from "react";
import Landing from "./landing";
import FirstSection from "./firstSection";
import BlackLeisure from "./blackLeisure";
import BasketBall from "./basketBall";

function Home() {
  return (
    <div className=" superFont overflow-hidden">
      <Landing />
      <FirstSection />
      <BlackLeisure />
      <BasketBall />
    </div>
  );
}

export default Home;
