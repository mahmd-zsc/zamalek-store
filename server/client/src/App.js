// App.jsx

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Dashboard from "./pages/admin/dashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import DashboardUsers from "./pages/admin/DashboardUsers";
import DashboardProducts from "./pages/admin/DashboardProducts";
import DashboardSize from "./pages/admin/DashboardSize";
import DashboardCategories from "./pages/admin/DashboardCategory";
import DashboardOrders from "./pages/admin/DashboardOrders";
import DashboardSupport from "./pages/admin/DashboardSupport";
import { useSelector } from "react-redux";
import Shop from "./pages/shop/shop";
import Login from "./pages/forms/login";
import Register from "./pages/forms/register";
import "./App.css";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/edit-profile";
import Product from "./pages/product/product";
import DashboardEditProduct from "./pages/admin/DashboardEditProduct";
import "animate.css";
import DashboardCategory from "./pages/admin/DashboardCategory";
import DashboardBrand from "./pages/admin/DashboardBrand";
import Setting from "./components/setting/setting";
import Sale from "./pages/sale/sale";
import Search from "./pages/search/search";
import NotFound from "./pages/notFound/notFound";
import AboutUs from "./pages/aboutUs/aboutUs";
import ContactUs from "./pages/contactUs/contactUs";
import TermsOfService from "./pages/termsOfService/termsOfService";

function App() {
  let { user } = useSelector((state) => state.auth);
  let [isDashboard, setIsDashboard] = useState();
  let location = useLocation();
  useEffect(() => {
    setIsDashboard(location.pathname.includes("dashboard"));
  }, [location]);
  return (
    <div className="App     ">
      <Setting />
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/search" element={<Search />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/termsOfService" element={<TermsOfService />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile"
          element={!user ? <Navigate to="/login" /> : <Profile />}
        />
        <Route
          path="/profile/edit-profile"
          element={!user ? <Navigate to="/login" /> : <EditProfile />}
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
            path="products/edit-product/:productId"
            element={
              user?.isAdmin ? <DashboardEditProduct /> : <Navigate to="/" />
            }
          />
          <Route
            path="sizes"
            element={user?.isAdmin ? <DashboardSize /> : <Navigate to="/" />}
          />
          <Route
            path="categories"
            element={
              user?.isAdmin ? <DashboardCategory /> : <Navigate to="/" />
            }
          />
          <Route
            path="brands"
            element={user?.isAdmin ? <DashboardBrand /> : <Navigate to="/" />}
          />
          <Route
            path="orders"
            element={user?.isAdmin ? <DashboardOrders /> : <Navigate to="/" />}
          />
          <Route
            path="support"
            element={user?.isAdmin ? <DashboardSupport /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
