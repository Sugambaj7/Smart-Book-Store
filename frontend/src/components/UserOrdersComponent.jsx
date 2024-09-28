import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../features/order/orderSlice";
import { fetchUserList } from "../features/user/userListSlice";
import { updateDeliveryAndPaidStatus } from "../features/order/orderSlice";
import { getOrderById } from "../features/order/orderSlice";

const UserOrdersComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchUserList());
  }, [dispatch]);

  const { allOrders } = useSelector((state) => state.order);
  const { userlist } = useSelector((state) => state.userlist);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const changeDeliveryAndPaidStatus = (order_id) => {
    dispatch(updateDeliveryAndPaidStatus({ order_id }))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllOrders());
        } else {
          console.error("Failed to update delivery and paid status");
        }
      })
      .catch((error) => {
        console.error("Error updating delivery and paid status:", error);
      });
  };

  const handleGetDetails = (order_id) => {
    dispatch(getOrderById(order_id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        navigate(`/admin/vieworder/${order_id}`);
      }
      else{
        console.error("Failed to get order details");
      }
    });
  };

  return (
    <>
      <div className="flex w-full">
        <div className="w-[5%]"></div>
        <div className="w-[90%] flex flex-col uppercase justify-between mb-3">
          <h2 className="text-3xl mt-10">All Orders</h2>

          <div className="w-full mt-6 mb-10">
            <table className="bg-table_background w-full border border-border_table">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="w-[17%] py-2">Id</th>
                  <th className="w-[13%] py-2">User Name</th>
                  <th className="w-[13%] py-2">Date</th>
                  <th className="w-[9%] py-2">Total</th>
                  <th className="w-[28%] py-2">Paid</th>
                  <th className="w-[10%] py-2">Delivered</th>
                  <th className="w-[10%] py-2">Details</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {(allOrders || []).map((order) => {
                  const user = userlist.find((user) => user._id === order.user);
                  return (
                    <tr
                      key={order._id}
                      className="w-full border border-border_table"
                    >
                      <td className="w-[17%] py-1">
                        <p className="text-center py-4 px-10">{order._id}</p>
                      </td>
                      <td className="w-[13%] py-1">
                        <p className="text-center py-4">
                          {user ? user.name : "Unknown"}
                        </p>
                      </td>
                      <td className="w-[13%] py-1">
                        <p className="text-center py-4">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>
                      <td className="w-[9%] py-1">
                        <p className="text-center py-4">
                          Rs {order.totalPrice}
                        </p>
                      </td>
                      <td className="w-[28%] py-1">
                        <div className="w-full flex justify-between">
                          <div className="w-[20%]"></div>
                          <div className="flex justify-between w-[60%]">
                            <p className="text-center px-2 py-4">
                              {order.isPaid ? "Paid" : "Not Paid"}
                            </p>
                            <div>
                              <button
                                className="px-2 py-2 mt-2 bg-custom_green text-white"
                                onClick={() =>
                                  changeDeliveryAndPaidStatus(order._id)
                                }
                              >
                                Mark Paid
                              </button>
                            </div>
                          </div>
                          <div className="w-[20%]"></div>
                        </div>
                      </td>
                      <td className="w-[10%] py-1">
                        <p className="text-center px-2 py-4">
                          {order.isDelivered ? "Delivered" : "Processing"}
                        </p>
                      </td>
                      <td className="w-[10%] py-1">
                        <div className="w-full flex justify-center">
                          <button
                            className="px-3 py-2 bg-black"
                            onClick={() => handleGetDetails(order._id)}
                          >
                            <p className="text-white">Details</p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[5%]"></div>
      </div>
    </>
  );
};

export default UserOrdersComponent;
