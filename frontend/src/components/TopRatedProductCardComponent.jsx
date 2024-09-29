import React from "react";
import Rating from "./Rating";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TopRatedProductCardComponent = () => {
  const { products, loading, error, success } = useSelector(
    (state) => state.products.recommendedTopRatedProducts
  );
  console.log(
    products,
    loading,
    error,
    success,
    "frontend ma top ratedproduct card ko data"
  );

  return (
    <div className="products">
      <div className="flex flex-wrap mt-12">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
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
            </div>
          ))
        ) : (
          <div>No Top rated products available</div>
        )}
      </div>
    </div>
  );
};

export default TopRatedProductCardComponent;
