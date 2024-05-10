import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/apiCalls/profileApiCall";

function DeleteUserCard({ deleteUserCard, deleteUserId, setDeleteUserCard }) {
  let dispatch = useDispatch();


  useEffect(() => {
    if (deleteUserCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [deleteUserCard]);

  const handleDelete = async () => {
    await dispatch(deleteUser(deleteUserId));
    dispatch(getAllUsers());
    setDeleteUserCard(false);
  };

  return (
    deleteUserCard && (
      <div className="w-full fixed inset-0 z-50">
        <div
          onClick={() => setDeleteUserCard(false)}
          className="w-full h-full bg-black opacity-15 absolute inset-0"
        ></div>
        <div className="lg:w-1/3 md:w-1/2 w-70% h-1/3 bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
          <div className="p-8 h-full flex flex-col justify-between">
            <div>
              <p className="text-xl mb-4">
                Are you sure you want to delete the user?
              </p>
              <p className="text-sm text-gray-500">
                Deleting this user will also delete all associated data,
                including user profile information, orders, and other related
                data. This action is irreversible.
              </p>
            </div>

            <div className="flex">
              <div className=" relative ">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 duration-200 text-white rounded"
                >
                  Delete User
                </button>
                {/* <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "5px solid rgb(255, 0, 0);",
                    borderTopColor: "white",
                    animation: "loader 0.60s linear infinite",
                    borderRadius: "50%",
                  }}
                  className="circle-loading absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto"
                ></div> */}
              </div>

              <button
                onClick={() => setDeleteUserCard(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 duration-200 text-gray-800 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteUserCard;
