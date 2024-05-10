import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { dashboardActions } from "../../redux/slices/dashboardSlice";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import { fetchBrands } from "../../redux/apiCalls/brandApiCalls";
import { getAllUsers } from "../../redux/apiCalls/profileApiCall";
import userImg from "../../images/icons/user.png";
import proImg from "../../images/icons/t-shirt.png";
import catImg from "../../images/icons/menu.png";
import brandImg from "../../images/icons/badge.png";
function DashboardHome() {
  const dispatch = useDispatch();
  const { product, category, brand, profile, dashboard } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(getAllUsers());
  }, []);

  const statistics = [
    {
      name: "categories",
      number: category?.categories?.length,
      image: catImg,
      color: "#5194F6",
    },
    {
      name: "products",
      number: product?.products?.totalCount,
      image: proImg,
      color: "#3CCE72",
    },
    {
      name: "users",
      number: profile?.profiles?.length,
      image: userImg,
      color: "#F37827",
    },
    {
      name: "brands",
      number: brand?.brands?.length,
      image: brandImg,
      color: "#ff0000",
    },
  ];

  const { fullSidebar } = dashboard;
  console.log(statistics);
  return (
    <div className="mx-auto">
      <div className="flex items-center gap-4 text-gray-900">
        <FontAwesomeIcon
          onClick={() =>
            dispatch(dashboardActions.setFullSidebar(!fullSidebar))
          }
          size="2xl"
          icon={faBars}
          className="cursor-pointer"
        />
        <h2 className="font-bold text-2xl capitalize">dashboard</h2>
      </div>
      <div className="mt-20">
        <div className=" grid grid-cols-4 gap-2  ">
          {statistics.map((s, index) => (
            <div className=" px-2 py-2 rounded-xl  bg-white">
              <div
                style={{
                  backgroundColor: s.color,
                  boxShadow: `inset 2px 0px 45px 5px rgba(0, 0, 0, 0.16) ` ,
                }}
                className={` relative -top-10  w-20 p-4 flex justify-center items-center rounded-xl     `}
              >
                <img src={s.image} className="" alt="" />
              </div>
              <p>{s.number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
