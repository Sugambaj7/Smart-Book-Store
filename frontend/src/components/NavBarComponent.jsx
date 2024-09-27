import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import AdminDropdownComponent from "./AdminDropdownComponent";
import UserDropdownComponent from "./UserDropdownComponent";

const NavBarComponent = () => {
  const [openDropdown, setDropdown] = useState(false);
  const { loading, myerror, success, userInfo } = useSelector(
    (state) => state.userLogin
  );

  // if (userInfo) {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
  // }

  return (
    <header>
      <nav className="navbar">
        <div className="top-nav  bg-footer_black h-[11vh] ">
          <div className="flex items-center h-full w-full relative">
            <h1 className="text-h3 pl-24 font-semibold py-3 text-white w-[20%]">
              <Link to="/">Smart Book Store</Link>
            </h1>
            <form
              className="flex items-center justify-start h-full w-[40%]"
              action=""
              method="post"
            >
              <div className="h-full flex pl-20 ">
                <div className="h-full flex items-center">
                  <input
                    className="px-4 py-4 h-9 outline-none"
                    type="text"
                    placeholder="Search book..."
                    name="search"
                  />
                </div>
                <div className="h-full flex items-center ml-2">
                  <div className="flex items-center px-3 py-4 h-5 text-center bg-footer_black border-2 border-border_green hover:bg-custom_green ">
                    <input
                      className="text-white"
                      type="button"
                      value="Search"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="h-full flex items-center uppercase w-[40%] relative">
              {userInfo && userInfo.isAdmin === false && (
                <div className="flex">
                  <Link
                    to="/recommendedProducts"
                    className="pl-2 text-custom_black uppercase hover:text-white"
                  >
                    Personalized Products
                  </Link>
                </div>
              )}
              {userInfo && userInfo.isAdmin === false && (
                <div className="flex pl-10">
                  <FaShoppingCart className="text-custom_black hover:text-white" />
                  <Link
                    to="/cart"
                    className="pl-2 text-custom_black uppercase hover:text-white"
                  >
                    Cart
                  </Link>
                </div>
              )}
              {!userInfo && (
                <div className="flex">
                  <FaShoppingCart className="text-custom_black hover:text-white" />
                  <Link
                    to="/cart"
                    className="pl-2 text-custom_black uppercase hover:text-white"
                  >
                    Cart
                  </Link>
                </div>
              )}

              {!userInfo && (
                <div className="flex ml-8 z-10">
                  <FaUser className="text-custom_black hover:text-white" />
                  <Link
                    to="/login"
                    className="pl-2 text-custom_black uppercase hover:text-white"
                  >
                    Login
                  </Link>
                </div>
              )}

              {userInfo && !userInfo.isAdmin && (
                <div className="ml-12">
                  <p
                    className="cursor-pointer flex text-custom_black hover:text-white"
                    onClick={() => setDropdown(!openDropdown)}
                  >
                    {userInfo.name}
                    <IoMdArrowDropdown />
                  </p>
                  {openDropdown && <UserDropdownComponent />}
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <div className="ml-12">
                  <p
                    className="cursor-pointer flex text-custom_black hover:text-white"
                    onClick={() => setDropdown(!openDropdown)}
                  >
                    {userInfo.name}
                    <IoMdArrowDropdown />
                  </p>
                  {openDropdown && <AdminDropdownComponent />}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarComponent;
