import React from "react";
import ProductCardComponent from "./ProjectCardComponent";

const HomePageAllProductComponent = () => {
  return (
    <div className="w-full mt-10">
      <h1 className="uppercase text-3xl">All Products</h1>
      <ProductCardComponent />
    </div>
  );
};

export default HomePageAllProductComponent;
