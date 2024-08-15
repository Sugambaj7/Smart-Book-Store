import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <NavBarComponent />
      <Outlet />
    </div>
  );
};

export default MainLayout;
