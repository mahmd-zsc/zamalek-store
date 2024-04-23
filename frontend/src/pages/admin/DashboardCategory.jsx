import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteImage from "../../images/icons/trash.png";
import editImage from "../../images/icons/pen.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import DeleteCategoryCard from "../../components/deleteCategoryCard/deleteCategoryCard";
import AddCategoryForm from "../../components/addCategoryForm/addCategoryForm";
import EditCategoryForm from "../../components/editCategoryForm/editCategoryForm";

function DashboardCategory() {
  const { categories, loading, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [category, setCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    AOS.init();
  }, []);

  // Function to truncate description text to a maximum number of characters
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

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
      {categories && categories.length > 0 && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg" data-aos="fade-up">
          <ul className="flex capitalize py-4 text-white bg-mainRed">
            <li className=" w-1/3 ps-3">Name</li>
            <li className="flex-1">Description</li>
            <li className=" w-1/6 text-center">action</li>
          </ul>
          {categories.map((category, index) => (
            <ul
              key={category.id}
              className={`flex items-center font-sans roboto-medium py-2 text-gray-700 border ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <li className="relative  w-1/3 flex items-center gap-2  ps-2">
                <p>{category.name}</p>
                <div className="absolute w-full h-full"></div>
              </li>
              <li className="flex-1">
                <p>{truncateDescription(category.description, 45)}</p>
              </li>
              <li className=" w-1/6 text-center flex items-center justify-evenly">
                <img
                  className="  w-8 hover:scale-105 duration-300 cursor-pointer"
                  src={editImage}
                  alt=""
                  onClick={() => {
                    setCategory(category);
                    setEditCategory(true);
                  }}
                />
                <img
                  className="  w-8 hover:scale-105 duration-300 cursor-pointer"
                  src={deleteImage}
                  alt=""
                  onClick={() => {
                    setDeleteCategory(true);
                    setCategoryIdToDelete(category.id);
                  }}
                />
              </li>
            </ul>
          ))}
        </div>
      )}
      {categories && categories.length === 0 && !loading && !error && (
        <div className="m-4 px-6 bg-gray-2 rounded-lg">
          <p className="text-2xl">There are no categories available</p>
        </div>
      )}
      {!loading && (
        <button
          // data-aos="fade-up"
          onClick={() => setAddCategory(true)}
          className="mx-10 my-5 bg-mainRed opacity-90 hover:opacity-100 duration-200 px-4 py-2 rounded-md mt-2 text-white"
        >
          Add Category
        </button>
      )}

      <DeleteCategoryCard
        deleteCategoryCard={deleteCategory}
        categoryId={categoryIdToDelete}
        setDeleteCategoryCard={setDeleteCategory}
      />
      {addCategory && (
        <AddCategoryForm
          addCategory={addCategory}
          setAddCategory={setAddCategory}
        />
      )}
      {editCategory && (
        <EditCategoryForm
          category={category}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />
      )}
    </div>
  );
}

export default DashboardCategory;
