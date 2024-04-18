import React from "react";

function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "8px solid black",
          borderTop: "8px solid white",
          borderRadius: "50%",
          width: "64px",
          height: "64px",
          animation: "spin 1s linear infinite",
        }}
      ></div>
    </div>
  );
}

export default Loading;
