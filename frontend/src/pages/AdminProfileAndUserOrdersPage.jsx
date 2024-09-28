import React from "react";
import UserProfileComponent from "../components/UserProfileComponent";
import UserOrdersComponent from "../components/UserOrdersComponent";

const AdminProfileAndUserOrdersPage = () => {
  return (
    <div className="flex w-full mt-10 mb-10">
      <div className="w-[25%] bg-red-500">
        <UserProfileComponent />
      </div>
      <div className="w-[75%] bg-purple-400">
        <UserOrdersComponent />
      </div>
    </div>
  );
};

export default AdminProfileAndUserOrdersPage;
