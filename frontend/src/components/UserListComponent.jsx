import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../features/user/userListSlice";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { deleteUser } from "../features/user/userListSlice";

const UserListComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const deleteHandler = async (user_id) => {
    if (window.confirm("Are you sure")) {
      try {
        await dispatch(deleteUser(user_id)).unwrap();
        dispatch(fetchUserList());
      } catch (error) {
        console.error("Failed to delete the product: ", error);
      }
    }
  };

  const { userlist, success } = useSelector((state) => state.userlist);

  return (
    <div className="flex w-full mt-10 mb-10">
      <div className="w-[15%]"></div>
      <div className="w-[70%]">
        <div className="flex uppercase w-full justify-between mb-3">
          <div>
            <h2 className="text-3xl">User List</h2>
          </div>
        </div>
        <div className="w-full mt-6">
          <table className="bg-table_background w-full border border-border_table">
            <thead className="w-full">
              <tr>
                <th className="w-[20%] px-2 py-3">Id</th>
                <th className="w-[20%] px-2 py-3">Name</th>
                <th className="w-[20%] px-2 py-3">Email</th>
                <th className="w-[20%] px-2 py-3">Role</th>
                <th className="w-[20%] px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {(userlist || []).map((user) => (
                <tr key={user._id} className="w-full">
                  <td className="w-[6%]">
                    <p className="text-center px-12 py-4">{user._id}</p>
                  </td>
                  <td className="w-[24%]">
                    <p className="text-center px-2 py-4">{user.name}</p>
                  </td>
                  <td className="w-[24%]">
                    <p className="text-center px-2 py-4">{user.email}</p>
                  </td>
                  <td className="w-[24%]">
                    <p className="text-center px-2 py-4">
                      {user.isAdmin ? "Admin" : "User"}
                    </p>
                  </td>
                  <td className="w-[24%]">
                    <div className="w-full flex justify-center">
                      <button
                        className="bg-red-500 px-1 py-1"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <MdOutlineDelete className="text-xl text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-[15%]"></div>
    </div>
  );
};

export default UserListComponent;
