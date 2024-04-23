import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddProductForm from "../../components/addProductForm/addProductForm";
import { useScrollToTop } from "../../utils/useScrollToTop ";

function DashboardAddProduct() {
 useScrollToTop()
  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);
  return (
    <div className="m-4">
      <Link to="/dashboard/products">
        <div className=" flex items-center gap-2  text-2xl roboto-medium cursor-pointer">
          <FontAwesomeIcon
            className="  border p-3 rounded-xl "
            icon={faArrowLeftLong}
          />

          <h2 className=" capitalize">add new products</h2>
        </div>
      </Link>
      <AddProductForm />
    </div>
  );
}

export default DashboardAddProduct;
