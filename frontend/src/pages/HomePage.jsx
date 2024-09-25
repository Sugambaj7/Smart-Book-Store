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
        </div>
        <div className="w-[10%]"></div>
      </div>
      <FooterComponent />
    </>
  );
};

export default HomePage;
