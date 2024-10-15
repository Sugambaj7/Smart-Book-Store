import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIndividualProduct,
  createProductReview,
  recommendContentBasedProducts,
} from "../features/products/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import ContentBasedProductComponent from "./ContentBasedProductCardComponent";

const IndividualProductComponent = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [doubleReview, setDoubleReview] = useState(false);
  const [contentBasedProducts, setContentBasedProducts] = useState([]);
  const { product_id } = useParams();
  const { products, loading, error, success } = useSelector(
    (state) => state.products
  );

  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  console.log(rating, comment, "rating rw comment k xa");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndividualProduct(product_id));
    dispatch(recommendContentBasedProducts(product_id)).then((action) => {
      if (recommendContentBasedProducts.fulfilled.match(action)) {
        setContentBasedProducts(action.payload);
      }
    });
  }, [dispatch, product_id]);

  const quantityOptions = [];
  const availableQuantity = products ? products.countInStock : 0;
  for (let i = 1; i <= availableQuantity; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const addToCartHandler = () => {
    navigate(`/cart/${product_id}?qty=${selectedQuantity}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      console.error("User not logged in");
      return;
    }

    const hasReviewed = products.reviews
      ? products.reviews.some((review) => review.user === userInfo._id)
      : false;

    if (hasReviewed) {
      setDoubleReview(true);
      setRating(0);
      setComment("");
      return;
    }

    const reviewData = {
      rating: rating,
      comment: comment,
    };

    try {
      if (!doubleReview) {
        const resultAction = await dispatch(
          createProductReview({ product_id, reviewData, userInfo })
        );
        if (createProductReview.fulfilled.match(resultAction)) {
          setReviewSuccess(true);
          // Update the products state to include the new review
          dispatch(fetchIndividualProduct(product_id));
          setRating(0);
          setComment("");
        }
      }
    } catch (error) {
      console.error("Failed to create review: ", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full mt-12 mb-10">
        <div className="w-[15%]"></div>
        <div className="w-[70%] flex">
          <div className="w-[46%] flex flex-col">
            <div className="w-[70%] h-[39vh]">
              <img
                src={"http://localhost:5001/" + products.image}
                className="w-full h-full"
                alt={products.name}
              />
            </div>
            <div className="w-full flex flex-col">
              <h1 className="text-xl uppercase pt-4 pb-1">Reviews</h1>
              {doubleReview && (
                <div className="w-full bg-alert_red px-6 py-3 border border-custom_alert rounded mt-3">
                  <p className="text-white text-sm tracking-wide">
                    You have already reviewed this product !!!
                  </p>
                </div>
              )}
              {reviewSuccess && (
                <div className="w-full bg-custom_green px-6 py-3 border border-custom_alert rounded mt-3">
                  <p className="text-white text-sm tracking-wide">
                    Thanks for the review!!!
                  </p>
                </div>
              )}
              {!reviewSuccess &&
              (!products.reviews || products.reviews.length === 0) ? (
                <div className="w-full bg-custom_blue px-6 py-3 border border-custom_alert rounded mt-3">
                  <p className="text-black text-sm tracking-wide">No Reviews</p>
                </div>
              ) : (
                //products is array and reviews is object
                products.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 border-b border-border_table"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} className="mt-2" />
                    <p className="mt-2">{review.createdAt.substring(0, 10)}</p>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))
              )}
              <div className="w-full">
                <h2 className="uppercase text-2xl px-2 mt-6">
                  Write a customer review
                </h2>
                {userInfo && userInfo.isAdmin === false ? (
                  <form
                    action=""
                    className="px-2 py-2"
                    onSubmit={submitHandler}
                  >
                    <div className="flex flex-col mt-1">
                      <label htmlFor="">Rating</label>
                      <select
                        className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                        type="text"
                        placeholder="Enter email"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        onFocus={() => setReviewSuccess(false)}
                        required
                      >
                        <option className="" value="">
                          Select...
                        </option>
                        <option className="" value="1">
                          1 - Poor
                        </option>
                        <option className="" value="2">
                          2 - Fair
                        </option>
                        <option className="" value="3">
                          3 - Good
                        </option>
                        <option className="" value="4">
                          4 - Very Good
                        </option>
                        <option className="" value="5">
                          5 - Excellent
                        </option>
                      </select>
                      <div className="flex flex-col mt-2">
                        <label htmlFor="">Comment</label>
                        <textarea
                          className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                          type="text"
                          placeholder=""
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          onFocus={() => setReviewSuccess(false)}
                          required
                        ></textarea>
                      </div>
                      <div className="mt-2">
                        <input
                          className="bg-black px-4 py-4 text-white"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <p className="mt-4 text-red-400">
                    Please sign in and checkout to give reviews and ratings and
                    you must be user
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-[27%] pl-10 py-4 ">
            <div className="border-b border-border_table">
              <h1 className="text-2xl mb-2">Product Details</h1>
            </div>
            <div className="pb-3 pt-3 border-b border-border_table">
              <p>{products.name}</p>
            </div>
            <div className="pb-3 pt-3 border-b border-border_table">
              <span>
                <Rating value={products.rating} />
              </span>
            </div>
            <div className="pb-3 pt-3 border-b border-border_table">
              <p>Price: Rs {products.price}</p>
            </div>
            <div className="flex pt-3 pb-3">
              <h2 className="text-lg">Description:</h2>
              <p>{products.description}</p>
            </div>
          </div>
          <div className="w-[27%] pl-20">
            <div className="border border_table flex flex-col">
              <div className="flex justify-between border-b border_table p-4">
                <p>Price:</p>
                <p>{products.price}</p>
              </div>
              <div className="flex justify-between border-b border_table p-4">
                <p>Status:</p>
                <p>{products.countInStock > 0 ? "In Stock" : "Out Of Stock"}</p>
              </div>
              <div className="flex justify-between border-b border_table p-4">
                <p>Qty</p>
                <form action="">
                  <select
                    name=""
                    id=""
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  >
                    <option value="">Select</option>
                    {quantityOptions}
                  </select>
                </form>
              </div>
              <div className="w-full p-2">
                {userInfo && userInfo.isAdmin ? (
                  <p>Sorry! You are not allowed to add to cart...</p>
                ) : (
                  <button
                    type="submit"
                    className="bg-black text-white p-2 w-full"
                    disabled={products.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[15%]"></div>
      </div>

      <div className="flex w-full mb-10 mt-10">
        <div className="w-[15%]"></div>
        <div className="w-[70%]">
          <h2 className="text-3xl"> Content Based Recommendation</h2>
          <ContentBasedProductComponent recommendedContentBasedProducts={contentBasedProducts} />
        </div>
        <div className="w-[15%]"></div>
      </div>
    </div>
  );
};

export default IndividualProductComponent;
