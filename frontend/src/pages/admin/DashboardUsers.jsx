import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiCalls/profileApiCall";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/icons/profile-user.png";
import deleteImage from "../../images/icons/trash.png";
import DeleteUserCard from "../../components/deleteUserCard/deleteUserCard";
import AOS from "aos";
import "aos/dist/aos.css";
function DashboardUsers() {
  const [deleteUserCard, setDeleteUserCard] = useState(false); // State for showing/hiding delete product card
  const [deleteUserId, setDeleteUserId] = useState(null); // State to store the id of the product to delete
  let navigate = useNavigate();
  let { profiles, loading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const deleteProductCardHandler = (userId) => {
    console.log(userId);
    setDeleteUserId(userId); // Set the id of the product to delete
    setDeleteUserCard(true); // Show the delete product card
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="h-full">
      {loading && (
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "10px solid rgb(255, 0, 0);",
            borderTopColor: "white",
            animation: "loader 0.60s linear infinite",
            borderRadius: "50%",
          }}
          className="circle-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto"
        ></div>
      )}
      {error && <div>{error}</div>}
      {profiles && profiles.length > 0 && !loading && !error && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg animate__animated animate__fadeInUp">
          {/* Thead */}
          <ul className="flex capitalize py-4 text-white bg-mainRed">
            <li className="flex-1 ps-3">user</li>
            <li className="w-1/4 text-center">email</li>
            <li className="w-1/4 text-center">action</li>
          </ul>
          {/* Tbody */}
          {profiles.map((p, index) => (
            <ul
              key={p.id}
              className={`flex items-center font-sans roboto-medium py-2 text-gray-700 border ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <li className="relative flex items-center gap-2 flex-1 ps-2">
                <img className="opacity-80" src={avatar} alt="" />
                <p>{p.username}</p>
                <div className="absolute w-full h-full"></div>
              </li>
              <li className="w-1/4 text-sm text-center">{p.email}</li>
              <li className="w-1/4 flex justify-evenly">
                <img
                  onClick={() => deleteProductCardHandler(p.id)} // Call deleteProductCardHandler when delete button is clicked
                  className="w-8 hover:scale-105 duration-300 cursor-pointer"
                  src={deleteImage}
                  alt=""
                />
              </li>
            </ul>
          ))}
        </div>
      )}
      {profiles && profiles.length === 0 && !loading && !error && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg">
          <p className=" text-2xl">there is no any products </p>
        </div>
      )}
      {/* {deleteProductCard && ( */}
      <DeleteUserCard
        deleteUserCard={deleteUserCard}
        setDeleteUserCard={setDeleteUserCard}
        deleteUserId={deleteUserId}
      />
      {/* )} */}
    </div>
  );
}

export default DashboardUsers;
