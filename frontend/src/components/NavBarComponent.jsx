import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const NavBarComponent = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="top-nav  bg-footer_black h-[11vh]">
          <div className="flex items-center h-full w-full">
            <h1 className="text-h3 pl-24 font-semibold py-3 text-white w-[20%]">
              <Link to="/">Smart Book Store</Link>
            </h1>
            <form
              className="flex items-center justify-start h-full w-[60%]"
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
            <div className="h-full flex items-center uppercase w-[20%]">
              <ul className="flex">
                <li className="text-custom_black flex items-center hover:text-white">
                  <FaShoppingCart />
                  <Link to="/cart" className="pl-2 ">
                    Cart
                  </Link>
                </li>
                <li className="text-custom_black flex items-center pl-8 hover:text-white">
                  <FaUser />
                  <Link to="/login" className="pl-2 ">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarComponent;
