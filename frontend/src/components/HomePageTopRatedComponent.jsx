import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedProducts } from "../features/products/productSlice";
import TopRatedProductCardComponent from "./TopRatedProductCardComponent";

const HomePageTopRatedComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="w-full mb-40">
        <h1 className="uppercase text-3xl">Top Rated Products</h1>
        <TopRatedProductCardComponent />
      </div>
    </div>
  );
};

export default HomePageTopRatedComponent;
