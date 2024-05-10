import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{ height: "calc(100vh - 150px)" }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">This page does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        <button className="shopNowSecondBlack bg-black px-4 py-2 rounded-2xl mt-2 border-2 border-black ">
          <span className="button-text">Return to Home</span>
          <div className="fill-container"></div>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
