import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import StructuredData from "./StructuredData ";
import OpenGraphMetaTags from "./OpenGraphMetaTags";
import IOSMetaTags from "./IOSMetaTags";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StructuredData />
      <OpenGraphMetaTags />
      <IOSMetaTags />
      <App />
    </Provider>
  </React.StrictMode>
);
