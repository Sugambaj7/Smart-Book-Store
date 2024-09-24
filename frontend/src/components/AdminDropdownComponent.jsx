import React from "react";
// import "./admindropdown.css";

const AdminDropdownComponent = () => {
  return (
    <div className="bg-white flex flex-col absolute top-14 right-20 w-36 z-20 admin-dropdown mt-3 border border-border_login_input">
      <ul className="flex flex-col text-black ">
        <li className="px-6 py-3 text-sm">Profile</li>
        <li className="px-6 py-3 text-sm">Users</li>
        <li className="px-6 py-3 text-sm">Products</li>
        <li className="px-6 py-3 text-sm">Orders</li>
        <li className="px-6 py-3 text-sm">Logout</li>
      </ul>
    </div>
  );
};

export default AdminDropdownComponent;
