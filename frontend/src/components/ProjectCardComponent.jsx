import React, { useEffect } from "react";
import Rating from "./Rating";
import productImages from "../img/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../features/products/productSlice";

const ProductCardComponent = () => {
  const { products, loading, error, success } = useSelector(
    (state) => state.products
  );
  console.log(
    products,
    loading,
    error,
    success,
    "frontend ma product card ko data"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductList());
  }, []);

  return (
    <div className="products">
      <div className="flex flex-wrap mt-12">
        {products.map((product) => (
          <div
            className="product-card mt-1 mb-8 ml-4 w-64 h-auto flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4"
            key={product.id}
          >
            <div className="h-[30vh] w-auto">
              <img
                className="ml-auto mr-auto h-full w-full"
                src={"http://localhost:5001/" + product.image}
                alt={product.name}
              />
            </div>

            <h3 className="text-2xl mt-8">{product.name}</h3>
            <div className="details-section flex justify-between items-center pt-4">
              <span>
                <Rating value={product.rating} />
              </span>
              <span className="text-xl font-semibold">
                {product.reviews.length > 0 ? (
                  <p key={index}>
                    <Rating value={review.rating} />
                  </p>
                ) : (
                  <p className="text-sm">No reviews yet</p>
                )}
              </span>
            </div>
            <div className="mt-2 mb-9">
              <p> Rs {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardComponent;
