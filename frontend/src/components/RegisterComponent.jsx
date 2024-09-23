import React from "react";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  return (
    <div className="w-full flex justify-between mt-10 mb-24">
      <div></div>
      <div className="h-full w-[35%]">
        <h2 className="text-3xl">SIGN UP</h2>
        <div className="flex flex-col mt-8">
          <label htmlFor="">Name</label>
          <input
            className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="">Email Address</label>
          <input
            className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
            type="text"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="">Password</label>
          <input
            className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
            type="text"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="">Confirm Password</label>
          <input
            className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
            type="text"
            placeholder="Confirm Password"
          />
        </div>
        <div className="flex flex-col w-[20%] bg-black text-white mt-4">
          <input
            className="px-4 py-3 cursor-pointer"
            type="button"
            value="Sign In"
          />
        </div>
        <div className="mt-4">
          <p>
            Have an Account?
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default RegisterComponent;
