import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiCalls/profileApiCall";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/icons/profile-user.png";
import deleteImage from "../../images/icons/trash.png";
import DeleteUserCard from "../../components/deleteUserCard/deleteUserCard";
import AOS from "aos";
import "aos/dist/aos.css";
import DeleteCard from "../../components/deleteCard/deleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEdit,
  faEllipsis,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { dashboardActions } from "../../redux/slices/dashboardSlice";
import ActionOfUser from "../../components/actionOfUser/actionOfUser";
function DashboardUsers() {
  const [deleteUserCard, setDeleteUserCard] = useState(false); // State for showing/hiding delete product card
  const [deleteUserId, setDeleteUserId] = useState(null); // State to store the id of the product to delete
  const [isActionMenuVisible, setActionMenuVisibility] = useState(false);

  let { profiles, loading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  let { fullSidebar } = useSelector((state) => state.dashboard);

  const deleteProductCardHandler = (userId) => {
    console.log(userId);
    setDeleteUserId(userId); // Set the id of the product to delete
    setDeleteUserCard(true); // Show the delete product card
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="h-full flex flex-col gap-6  custom-scrollbar pb-24">
      {error && <div>{error}</div>}
      <div className=" flex items-center gap-4 text-gray-900 ">
        <FontAwesomeIcon
          onClick={() =>
            dispatch(dashboardActions.setFullSidebar(!fullSidebar))
          }
          size="2xl"
          icon={faBars}
          className=" cursor-pointer"
        />
        <h2 className=" font-bold text-2xl">users</h2>
      </div>
      {profiles && profiles.length > 0 && !loading && !error && (
        <div className="my-4  bg-gray-2 rounded-lg ">
          {/* Thead */}
          <ul className="flex capitalize  py-4  text-gray-500 bg-white rounded-lg">
            <li className="flex-1 ps-3">user</li>
            <li className="w-1/4 text-center">email</li>
            <li className="w-1/4 text-center"></li>
          </ul>

          {/* Tbody */}
          <div className="relative top-2  flex flex-col rounded-lg">
            {profiles.map((p, index) => (
              <ul
                key={p.id}
                className={`  flex items-center font-sans roboto-medium py-3 text-gray-700  bg-white px-3 duration-300 hover:bg-gray-200 cursor-pointer `}
              >
                <li className="relative flex items-center gap-2 flex-1 ps-2">
                  <img className="opacity-50" src={avatar} alt="" />
                  <p>{p.username}</p>
                  <div className="absolute w-full h-full"></div>
                </li>
                <li className="w-1/4 text-sm text-center">{p.email}</li>
                <li className=" relative w-1/4 flex justify-end pr-2">
                  <ActionOfUser userId={p._id} />
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
      {profiles && profiles.length === 0 && !loading && !error && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg">
          <p className=" text-2xl">there is no any products </p>
        </div>
      )}
      {/* {deleteProductCard && ( */}
      <DeleteCard
        type={"product"}
        deleteCard={deleteUserCard}
        deleteId={deleteUserId}
        setDeleteCard={setDeleteUserCard}
      />
      {/* )} */}
    </div>
  );
}

export default DashboardUsers;
