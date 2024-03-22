// Home.js
import React from "react";
import Landing from "./landing/landing";
import FirstSection from "./firstSection/firstSection";
import BlackLeisure from "./blackLeisure/blackLeisure";
import BasketBall from "./basketBall/basketBall";

function Home() {
  return (
    <div>
      <Landing />
      <FirstSection />
      <BlackLeisure />
      <BasketBall />
    </div>
  );
}

export default Home;
