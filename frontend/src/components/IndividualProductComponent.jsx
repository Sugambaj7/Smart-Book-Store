import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndividualProduct } from "../features/products/productSlice";
import { useParams } from "react-router-dom";
import Rating from "./Rating";

const IndividualProductComponent = () => {
  const { product_id } = useParams();
  const { products, loading, error, success } = useSelector(
    (state) => state.products
  );

  console.log(
    products,
    loading,
    error,
    success,
    "frontend ma product card ko data katiii ko aaayo tw"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndividualProduct(product_id));
  }, []);

  const quantityOptions = [];
  const availableQuantity = products ? products.countInStock : 0;
  for (let i = 1; i <= availableQuantity; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
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
            {products.reviews && products.reviews.length > 0 ? (
              <div className="w-full bg-custom_green px-6 py-3 border border-custom_alert rounded mt-3">
                <p className="text-black text-sm tracking-wide">Yes Reviews</p>
              </div>
            ) : (
              <div className="w-full bg-custom_blue px-6 py-3 border border-custom_alert rounded mt-3">
                <p className="text-black text-sm tracking-wide">No Reviews</p>
              </div>
            )}
            <div className="w-full">
              <h2 className="uppercase text-2xl px-2 mt-6">
                Write a customer review
              </h2>
              <form action="" className="px-2 py-2">
                <div className="flex flex-col mt-1">
                  <label htmlFor="">Rating</label>
                  <select
                    className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                    type="text"
                    placeholder="Enter email"
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
                <select name="" id="">
                  {/* {[...Array(products.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))} */}
                  <option value="">Select</option>
                  {quantityOptions}
                </select>
              </form>
            </div>
            <div className="w-full p-2">
              <button className="bg-black text-white p-2 w-full">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[15%]"></div>
    </div>
  );
};

export default IndividualProductComponent;
