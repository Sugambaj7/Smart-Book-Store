import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import CategoryComponent from "../components/CategoryComponent";
import CarousalComponent from "../components/CarousalComponent";
import FooterComponent from "../components/FooterComponent";

const HomePage = () => {
  return (
    <>
      <NavBarComponent />
      <CarousalComponent />
      <div className="px-28 py-10">
        <div className="bg-custom_white">
          <CategoryComponent />
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default HomePage;
