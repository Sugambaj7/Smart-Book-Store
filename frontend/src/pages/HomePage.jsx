import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import CategoryComponent from "../components/CategoryComponent";
import CarousalComponent from "../components/CarousalComponent";
import FooterComponent from "../components/FooterComponent";
import HomePageAllProductComponent from "../components/HomePageAllProductComponent";


const HomePage = () => {

  return (
    <>
      <NavBarComponent />
      <CarousalComponent />
      <div className="flex">
        <div className="w-[10%]"></div>
        <div className="w-[80%] flex flex-col">
          <CategoryComponent />
          <HomePageAllProductComponent />
          <div className="bg-red-500 mt-4 flex">
            <h2 className="text-3xl">Top Rated Products</h2>
          </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
      <FooterComponent />
    </>
  );
};

export default HomePage;
