import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProductsByName } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const SearchResultComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsByName(keyword));
  }, []);

  const { products, error, success } = useSelector((state) => state.products);

  return (
    <div className="flex mt-10 mb-80">
      <div className="w-[10%]"></div>
      <div className="w-[80%] flex flex-col">
        <h1 className="text-3xl">Search Results:</h1>
        <div className="mt-10">
          {success && products.length > 0 ? products.map((product) => <div
              className="product-card mt-1 mb-8 ml-4 w-64 h-auto flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4"
              key={product.id}
            >
              <div className="h-[30vh] w-auto">
                <Link to={`/product/${product._id}`}>
                  <img
                    className="ml-auto mr-auto h-full w-full"
                    src={"http://localhost:5001/" + product.image}
                    alt={product.name}
                  />
                </Link>
              </div>
              <Link to={`/product/${product._id}`}>
                <h3 className="text-2xl mt-8">{product.name}</h3>
              </Link>

              <div className="details-section flex justify-between items-center pt-4">
                <span>
                  <Rating value={product.rating} />
                </span>
                <span className="text-xl font-semibold">
                  {product.reviews.length ? (
                    <p className="text-sm">{product.reviews.length} Reviews</p>
                  ) : (
                    <p className="text-sm">No reviews yet</p>
                  )}
                </span>
              </div>
              <div className="mt-2 mb-9">
                <p> Rs {product.price}</p>
              </div>
            </div> ): <p className="text-2xl text-red-400">{error}!!!</p>}
        </div>
      </div>
      <div className="w-[10%]"></div>
    </div>
  );
};

export default SearchResultComponent;
