import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userLoginSlice";
import { useNavigate, Link } from "react-router-dom";

const UserDropdownComponent = () => {
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
        <li className="px-6 py-3 text-sm">
          <button
            className="uppercase"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownComponent;
