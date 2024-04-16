// App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Product from "./components/product/product";
import Dashboard from "./pages/admin/dashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import DashboardUsers from "./pages/admin/DashboardUsers";
import DashboardProducts from "./pages/admin/DashboardProducts";
import DashboardSizes from "./pages/admin/DashboardSizes";
import DashboardCategories from "./pages/admin/DashboardCategories";
import DashboardOrders from "./pages/admin/DashboardOrders";
import DashboardSupport from "./pages/admin/DashboardSupport";
import { useSelector } from "react-redux";
import Shop from "./pages/shop/shop";
import Login from "./pages/forms/login";
import Register from "./pages/forms/register";
import "./App.css";
import Profile from "./pages/profile/profile";
function App() {
  let { user } = useSelector((state) => state.auth);

  return (
    <div className="App min-h-screen  overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/profile"
            element={!user ? <Navigate to="/login" /> : <Profile />}
          />
          <Route path="/shop/products/:id" element={<Product />} />
          <Route
            path="/dashboard/*"
            element={user?.isAdmin ? <Dashboard /> : <Navigate to="/" />}
          >
            <Route
              index
              element={user?.isAdmin ? <DashboardHome /> : <Navigate to="/" />}
            />
            <Route
              path="users"
              element={user?.isAdmin ? <DashboardUsers /> : <Navigate to="/" />}
            />
            <Route
              path="products"
              element={
                user?.isAdmin ? <DashboardProducts /> : <Navigate to="/" />
              }
            />
            <Route
              path="sizes"
              element={user?.isAdmin ? <DashboardSizes /> : <Navigate to="/" />}
            />
            <Route
              path="categories"
              element={
                user?.isAdmin ? <DashboardCategories /> : <Navigate to="/" />
              }
            />
            <Route
              path="orders"
              element={
                user?.isAdmin ? <DashboardOrders /> : <Navigate to="/" />
              }
            />
            <Route
              path="support"
              element={
                user?.isAdmin ? <DashboardSupport /> : <Navigate to="/" />
              }
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
