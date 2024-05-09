import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./pagination.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchProducts } from "../../redux/apiCalls/productApiCalls";
import { useLocation } from "react-router-dom";
import { ScrollToTop } from "../../utils/ScrollToTop ";

function Pagination({ products, loading }) {
  let location = useLocation();
  let dispatch = useDispatch();

  let [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState(products.totalPages);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = +queryParams.get("page") || 1;
    setCurrentPage(page);
    setTotalPages(products.totalPages);
    ScrollToTop();
  }, [products, dispatch]);

  const handleClickPage = (value) => {
    if (currentPage !== value) {
      setCurrentPage(value);
      setIsMounted(true);
    }
  };

  useEffect(() => {
    if (isMounted) {
      // Update URL and fetch products when sizes change
      const updateUrlAndFetchProducts = () => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("page", currentPage);

        window.history.replaceState(null, null, `?${queryParams.toString()}`);
        dispatch(fetchProducts()); // Fetch products after updating URL
      };

      const timeoutId = setTimeout(updateUrlAndFetchProducts, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [currentPage, isMounted]);
  return (
    totalPages !== 1 && (
      <div className="pagination mb-16 mt-6 superFont text-gray-900">
        <ul className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleClickPage(currentPage - 1)}
            className={`px-2 cursor-pointer ${
              currentPage === 1 ? "hidden" : ""
            }`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              onClick={() => handleClickPage(index + 1)}
              className={`relative px-2 paginationNumber cursor-pointer ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index + 1}
            >
              {index + 1}
            </li>
          ))}
          {currentPage !== totalPages && products?.data?.length > 0 && (
            <button
              onClick={() => handleClickPage(currentPage + 1)}
              className={`px-2 cursor-pointer ${
                currentPage === totalPages ? "hidden" : ""
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          )}
        </ul>
      </div>
    )
  );
}

export default Pagination;
