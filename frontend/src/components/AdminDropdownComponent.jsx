import React from "react";
// import "./admindropdown.css";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userLoginSlice";
import { useNavigate } from "react-router-dom";

const AdminDropdownComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="bg-white flex flex-col absolute top-14 right-20 w-36 z-20 admin-dropdown mt-3 border border-border_login_input">
      <ul className="flex flex-col text-black ">
        <li className="px-6 py-3 text-sm">Profile</li>
        <li className="px-6 py-3 text-sm">Users</li>
        <li className="px-6 py-3 text-sm">Products</li>
        <li className="px-6 py-3 text-sm">Orders</li>
        <li className="px-6 py-3 text-sm">
          <button className="uppercase" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDropdownComponent;
