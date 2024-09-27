import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommendPersonalizedProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const RecommendedProducts = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const { recommendPersonalizeProducts } = useSelector(
    (state) => state.products
  );

  console.log(recommendPersonalizeProducts, "recommendPersonalizedProducts");

  const user_id = userInfo._id;
  useEffect(() => {
    console.log(user_id, "user_id ma k aaako xa homepage");
    dispatch(recommendPersonalizedProducts(user_id));
  }, [dispatch, user_id]);
  return (
    <div className="flex mt-10 mb-20">
      <div className="w-[10%]"></div>
      <div className="w-[80%] flex flex-col">
        <h1 className="text-3xl">Personalized Products</h1>
        <div className="products">
          <div className="flex flex-wrap mt-12">
            {recommendPersonalizeProducts &&
            recommendPersonalizeProducts.length > 0 ? (
              recommendPersonalizeProducts.map((product) => (
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
                        <p className="text-sm">
                          {product.reviews.length} Reviews
                        </p>
                      ) : (
                        <div>
                          <p className="text-sm">No reviews yet</p>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="mt-2 mb-9">
                    <p> Rs {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-sm">
                  No Personalized Products yet!!! Didn't fulfill criteria for
                  recommendation!!!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[10%]"></div>
    </div>
  );
};

export default RecommendedProducts;
