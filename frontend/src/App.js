import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./styles/App.css";
import Shop from "./components/shop/shop";
import Product from "./components/product/product";
import Dashboard from "./components/Dashboard/dashboard";
import DashboardHome from "./components/Dashboard/DashboardHome";
import DashboardUsers from "./components/Dashboard/DashboardUsers";
import DashboardProducts from "./components/Dashboard/DashboardProducts";
import DashboardSizes from "./components/Dashboard/DashboardSizes";
import DashboardCategories from "./components/Dashboard/DashboardCategories";
import DashboardOrders from "./components/Dashboard/DashboardOrders";
import DashboardSupport from "./components/Dashboard/DashboardSupport";

function App() {
  return (
    <div className="App overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/products/:id" element={<Product />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<DashboardUsers />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="sizes" element={<DashboardSizes />} />
            <Route path="categories" element={<DashboardCategories />} />
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="support" element={<DashboardSupport />} /> */}
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
