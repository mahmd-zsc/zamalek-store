import { faEllipsis, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import DeleteCard from "../deleteCard/deleteCard";

function ActionOfUser({ userId }) {
  const [isActionMenuVisible, setActionMenuVisibility] = useState(false);
  const actionRef = useRef(null);
  let [deleteCard, setDeleteCard] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setActionMenuVisibility(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <FontAwesomeIcon
        onClick={() => setActionMenuVisibility(!isActionMenuVisible)}
        icon={faEllipsis}
        className=""
      />
      {isActionMenuVisible && (
        <div
          ref={actionRef}
          className="absolute right-0 top-4 mt-2 w-32 bg-gray-100 rounded-lg shadow-md z-30"
        >
          <ul className="py-1">
            <li
              onClick={() => {
                setActionMenuVisibility(false);
                setDeleteCard(true);
              }}
              className="px-4 py-2 flex items-center hover:bg-gray-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Delete
            </li>
          </ul>
        </div>
      )}
      <DeleteCard
        type={"user"}
        deleteCard={deleteCard}
        deleteId={userId}
        setDeleteCard={setDeleteCard}
      />
    </>
  );
}

export default ActionOfUser;
