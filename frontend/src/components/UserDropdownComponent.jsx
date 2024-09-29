import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userLoginSlice";
import { useNavigate, Link } from "react-router-dom";

const UserDropdownComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const userID = userInfo._id;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="bg-white flex flex-col absolute top-14 right-20 w-36 z-20 admin-dropdown mt-3 border border-border_login_input">
      <ul className="flex flex-col text-black ">
        <Link to={"/user/profile"}>
          <li className="px-6 py-3 text-sm">Profile</li>
        </Link>
        <Link to={`/view/orders/${userID}`}>
          <li className="px-6 py-3 text-sm">Orders</li>
        </Link>
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
