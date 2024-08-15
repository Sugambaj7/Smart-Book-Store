import React from "react";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="top-nav  bg-footer_black h-[7vh]">
          <div className="flex justify-between items-center h-full">
            <h1 className="text-h3 pl-24 font-semibold py-3 text-white">
              Smart Book Store
            </h1>
            <form className="pr-28 flex" action="" method="post">
              <div className="h-8">
                <input
                  className="px-4 py-1 h-8"
                  type="text"
                  placeholder="Enter book name here !"
                  tabIndex="-1"
                />
              </div>
              <div className="h-8">
                <input
                  className="px-4 py-1 h-8 text-black bg-custom_grey"
                  type="button"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="bottom-nav h-[10vh] flex border-b-2 border-white_border">
          <div className="w-1/6"></div>
          <ul className="flex-1 flex gap-20 justify-center items-center text-lg">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/shop">
              <li>Shop</li>
            </Link>
            <Link to="/wishlist">
              <li>Wishlist</li>
            </Link>
            <Link to="/cart">
              <li>Cart</li>
            </Link>
            <Link to="/orders">
              <li>Orders</li>
            </Link>
          </ul>
          <div className="w-1/6"></div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarComponent;
