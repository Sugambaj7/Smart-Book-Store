import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

const MainLayout = () => {
  return (
    <div>
      <NavBarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
