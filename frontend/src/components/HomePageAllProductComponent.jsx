import React from "react";
import ProductCardComponent from "./ProductCardComponent";

const HomePageAllProductComponent = () => {
  return (
    <div className="w-full mt-10 mb-40">
      <h1 className="uppercase text-3xl">All Books</h1>
      <ProductCardComponent />
    </div>
  );
};

export default HomePageAllProductComponent;
