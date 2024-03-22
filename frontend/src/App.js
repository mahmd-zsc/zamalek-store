import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home"; // Update the path and component name as needed
import Header from "./components/header/header";
import Footer from "./components/footer/footter";
import "./styles/App.css"
function App() {
  return (
    <div className="App overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
