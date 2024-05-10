import React from "react";
import { useLocation } from "react-router-dom";

export default Location = () => {
  let { pathname } = useLocation();
  return pathname;
};
