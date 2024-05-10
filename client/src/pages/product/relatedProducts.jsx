import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getProductById } from "../../redux/apiCalls/productApiCalls";
import { ScrollToTop } from "../../utils/ScrollToTop ";

function RelatedProducts() {
  let { relatedProducts } = useSelector((state) => state.product.product);
  let dispatch = useDispatch();
  let { id } = useParams();

  const [imageLoaded, setImageLoaded] = useState(false);
  let navigate = useNavigate();
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  let relHandlerClick = async (rel) => {
    dispatch(getProductById(id));
    navigate(`/shop/products/${rel.id}`);
    ScrollToTop();
  };
  return (
    relatedProducts && (
      <div className=" pt-10">
        <div className=" pb-4">
          <p className=" font-semibold capitalize text-gray-600 text-center md:text-start  text-2xl">
            you may also like
          </p>
        </div>
        <div className="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  p-2">
          {relatedProducts.map((rel) => (
            <div
              onClick={() => relHandlerClick(rel)}
              className={`flex h-full flex-col gap-4 rounded-md overflow-hidden py-4 roboto-bold cursor-pointer  card bg-white ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                className="flex-1 w-full object-cover duration-300"
                src={rel.image.url}
                alt={rel.name}
                onLoad={handleImageLoad}
                style={{ imageRendering: "auto" }}
              />

              <div className="px-4">
                <div className="w-full h-px bg-gray-300 rounded-full"></div>
              </div>
              <div className="px-10 flex flex-col gap-2 text-center">
                <p className="capitalize text-sm">{rel.title}</p>
                <div className=" h-10 flex flex-col">
                  <p className="font-thin text-xs opacity-80 ">
                    LE{" "}
                    <span>{Number(rel.price - rel.discount).toFixed(2)}</span>{" "}
                    EGP
                  </p>
                  {rel.discount ? (
                    <p className="font-thin text-xs opacity-80">
                      <del>
                        LE <span> {rel.price}</span> EGP
                      </del>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default RelatedProducts;
